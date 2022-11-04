const multipleEntry = require('react-app-rewire-multiple-entry')([
    {
      entry: 'src/frontends/andi/index.tsx',
      template: 'src/frontends/andi/index.html',
      outPath: '/andi/index.html'
    },
    {
      entry: 'src/frontends/supplier/index.tsx',
      template: 'src/frontends/supplier/index.html',
      outPath: '/supplier/index.html'
    }
  ]);
  
  /**
   * https://github.com/Derek-Hu/react-app-rewire-multiple-entry/issues/31#issuecomment-1010679745
   */
  module.exports = {
    webpack: function(config, env) {
      // multipleEntry expects an "options" object but since cra v5 it is called "userOptions"
      // HACK -> copy userOptions reference and hope for the best
      const webpackPlugins = config.plugins.filter(p => p.constructor.name === 'HtmlWebpackPlugin');
      webpackPlugins.forEach(p => p.options = p.userOptions);
  
      // the original call
      multipleEntry.addMultiEntry(config);
  
      // now carry on with the options object
      webpackPlugins.forEach(p => { p.userOptions = p.options; delete p.options; });

      console.log(config);

      return config;
    }
  };
  

// /* eslint-disable no-console */
// /* eslint-disable @typescript-eslint/explicit-function-return-type */
// const path = require('path');

// const rewireEntries = [
//   {
//     name: 'andi',
//     entry: path.resolve(__dirname, 'src/frontends/andi/index.tsx'),
//     template: path.resolve(__dirname, 'src/frontends/andi/index.html'),
//     outPath: '/andi/index.html',
//   },
//   {
//     name: 'supplier',
//     entry: path.resolve(__dirname, 'src/frontends/supplier/index.tsx'),
//     template: path.resolve(__dirname, 'src/frontends/supplier/index.html'),
//     outPath: '/supplier/index.html',
//   }
// ];

// const defaultEntryName = 'main';

// const appIndexes = ['js', 'tsx', 'ts', 'jsx'].map((ext) =>
//   path.resolve(__dirname, `src/index.${ext}`)
// );

// function webpackMultipleEntries(config) {
//   // Multiple Entry JS
//   const defaultEntryHTMLPlugin = config.plugins.filter((plugin) => {
//     return plugin.constructor.name === 'HtmlWebpackPlugin';
//   })[0];
//   defaultEntryHTMLPlugin.userOptions.chunks = [defaultEntryName];

//   // config.entry is not an array in Create React App 4
//   if (!Array.isArray(config.entry)) {
//     config.entry = [config.entry];
//   }

//   // If there is only one entry file then it should not be necessary for the rest of the entries
//   const necessaryEntry =
//     config.entry.length === 1
//       ? []
//       : config.entry.filter((file) => !appIndexes.includes(file));
//   const multipleEntry = {};
//   multipleEntry[defaultEntryName] = config.entry;

//   rewireEntries.forEach((entry) => {
//     multipleEntry[entry.name] = necessaryEntry.concat(entry.entry);
//     // Multiple Entry HTML Plugin
//     config.plugins.unshift(
//       new defaultEntryHTMLPlugin.constructor(
//         Object.assign({}, defaultEntryHTMLPlugin.options, {
//           filename: entry.outPath,
//           template: entry.template,
//           chunks: [entry.name],
//         })
//       )
//     );
//   });
//   config.entry = multipleEntry;

//   // Multiple Entry Output File
//   let names = config.output.filename.split('/').reverse();

//   if (names[0].indexOf('[name]') === -1) {
//     names[0] = '[name].' + names[0];
//     config.output.filename = names.reverse().join('/');
//   }

//   return config;
// }

//   // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
//   const makeCracoConfig = () => {
//     console.log("TEST")
//     return {
//         webpack: function(config, env) {
//             console.log(webpackMultipleEntries(config))
//             return webpackMultipleEntries(config)
//         },
//       };
//   };
  

//   module.exports = makeCracoConfig();