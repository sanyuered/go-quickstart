function setTheme() {
  var preview = document.querySelector('.demo-theme-preview');
  var themes = document.querySelectorAll('[rel="stylesheet"]');

  // bubble click event
  preview.onclick = function (e) {
    var title = e.target.getAttribute('data-theme')
    if (!title) {
      return
    }

    themes.forEach(function (theme) {
      theme.disabled = theme.title !== title
    });
  };
}

function setActiveLink() {
  var nav = document.querySelector('.app-nav');
  nav.addEventListener("click", function (e) {
    var target = e.target
    if (target.tagName !== 'A') {
      return
    }
    var parent = target.parentNode.parentNode
    var activeLinks = parent.querySelectorAll('a.active');

    activeLinks.forEach(function (item) {
      item.classList.remove("active")
    })

    target.classList.add("active")
  })
}

function setLang() {
  // Set html "lang" attribute based on URL
  var lang = location.hash.match(/#\/(en|zh-tw|zh-cn)\//);
  var page_lang = 'en'
  if (lang) {
    page_lang = lang[1]
  }

  document.documentElement.setAttribute('lang', page_lang);
  var language_items = window.custom_language[page_lang]
  Object.keys(language_items)
    .forEach(function (item) {
      document.querySelector(`[data-text="${item}"]`).textContent = language_items[item]
    })
}

// dom ready
document.onreadystatechange = function () {
  if (document.readyState == "complete") {
    setTheme()
    setActiveLink()
  }
}

window.custom_language = {
  'en': {
    language: 'Language',
    english: 'English',
    Chinese: '中文',
    theme: 'Theme',
    light_theme: 'Light theme',
    dark_theme: 'Dark theme',
  },
  'zh-cn': {
    language: '网站语言',
    english: 'English',
    Chinese: '中文',
    theme: '网站主题',
    light_theme: '浅色主题',
    dark_theme: '深色主题',
  },
}

window.$docsify = {
  name: '',
  // repo: 'sanyuered/go-quickstart',
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

      hook.doneEach(function () {
        setLang()
      });
    }
  ],
}