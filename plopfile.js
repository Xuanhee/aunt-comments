module.exports = (plop) => {
  plop.setGenerator('pages', {
    description: 'create pages',
    prompts: [
      {
        type: 'input',
        name: 'dir',
        message: 'dir name?',
      },
      {
        type: 'input',
        name: 'name',
        message: 'pages/file name?',
      },
    ],
    actions(data) {
      console.log(data)
      const actions = []
      actions.push({
        type: 'add',
        path: 'src/views/{{dir}}/{{name}}.jsx',
        templateFile: 'plop-template/pages.hbs',
      })
      // 转成小写
      const toLowerName = data.name.toLowerCase()
      actions.push({
        type: 'add',
        path: `src/views/{{dir}}/${toLowerName}.css`,
        templateFile: 'plop-template/css.hbs',
      })

      return actions
    },
  })
}
