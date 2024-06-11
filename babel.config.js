module.exports = function (api) {
    api.cache(true);
       
    // const isProduction = process.env.NODE_ENV === 'production';
  
    const presets = [
      '@babel/preset-env',
      '@babel/preset-react'
    ];
  
    const plugins = [];
  
    // if (isProduction) {
    // }
plugins.push('transform-remove-console');
  
    return {
      presets,
      plugins
    };
  };
  