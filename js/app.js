function setTheme(title){
  var themes = document.querySelectorAll('[rel="stylesheet"]');
  themes.forEach(function (theme) {
    if(theme.title === title){
      theme.disabled = false
    }
  });
  themes.forEach(function (theme) {
    if(theme.title !== title){
      theme.disabled = true
    }
  });
}

window.$docsify = {
  // name: '',
  // repo: 'sanyuered/go-quickstart',
  loadSidebar: true,
  subMaxLevel: 3,
  loadNavbar: true,
  search: {
    paths: 'auto',
    namespace: 'go-quickstart',
    noData: {
      '/': 'No Results!',
      '/zh-cn/': '找不到结果。',
    },
    placeholder: {
      '/': 'Type to search',
      '/zh-cn/': '请输入搜索文字',
    },
    pathNamespaces: ['/zh-cn'],
  },
  plugins: [
    function (hook) {
      var footer = `
          <hr/>
          <footer>
          <p>Copyright &copy; 2023 sanyuered</p>
          </footer>`;

      hook.afterEach(function (html) {
        return html + footer;
      });
    }
  ],
}