export default args => {
  const configs = args.configDefaultConfig;
  return configs.map(config => ({
    ...config,
    onwarn(warning, warn) {
      if (warning.code === "CIRCULAR_DEPENDENCY") return;
      config.onwarn(warning, warn);
    }
  }));
};
