module.exports = {
  source: "./src",
  destination: "./docs/api",
  plugins: [
    {
      name: "esdoc-standard-plugin",
      options: {
        undocumentIdentifier: {
          enable: false
        },
        accessor: {
          autoPrivate: false
        },
        brand: {
          title: 'bolikin',
          description: 'A simple test harness for both Node.js and browsers'
        }
      },
    },
  ]
}
