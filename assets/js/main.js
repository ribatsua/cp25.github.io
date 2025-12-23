// 个人知识库系统JavaScript核心功能

// DOM元素缓存
const elements = {
    // 主题切换
    themeToggle: document.getElementById('theme-toggle'),
    
    // 搜索功能
    searchToggle: document.getElementById('search-toggle'),
    searchContainer: document.getElementById('search-container'),
    searchOverlay: document.getElementById('search-overlay'),
    searchClose: document.getElementById('search-close'),
    searchInput: document.getElementById('search-input'),
    
    // 移动端导航
    navbarToggle: document.getElementById('navbar-toggle'),
    navbarNavMobile: document.getElementById('navbar-nav-mobile'),
    
    // 回到顶部
    backToTop: document.getElementById('back-to-top'),
    
    // 标签筛选
    tagsCloud: document.getElementById('tags-cloud'),
    tagsList: document.querySelector('.tags-list'),
    postsList: document.getElementById('posts-list'),
    postItems: document.querySelectorAll('.post-item')
};

// 主题切换功能
function initThemeToggle() {
    // 获取当前主题设置
    const currentTheme = localStorage.getItem('theme') || 
                       (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // 应用初始主题
    applyTheme(currentTheme);
    
    // 监听主题切换按钮点击
    elements.themeToggle.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    // 监听系统主题变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        const systemTheme = e.matches ? 'dark' : 'light';
        const savedTheme = localStorage.getItem('theme');
        if (!savedTheme) {
            applyTheme(systemTheme);
        }
    });
}

// 应用主题
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const icon = elements.themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// 搜索功能
function initSearch() {
    // 打开搜索
    elements.searchToggle.addEventListener('click', () => {
        elements.searchContainer.classList.add('show');
        setTimeout(() => elements.searchInput.focus(), 300);
    });
    
    // 关闭搜索
    elements.searchClose.addEventListener('click', closeSearch);
    elements.searchOverlay.addEventListener('click', closeSearch);
    
    // 按ESC键关闭搜索
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && elements.searchContainer.classList.contains('show')) {
            closeSearch();
        }
    });
    
    // 搜索功能
    elements.searchInput.addEventListener('input', handleSearch);
}

// 关闭搜索
function closeSearch() {
    elements.searchContainer.classList.remove('show');
    elements.searchInput.value = '';
    resetSearch();
}

// 处理搜索
function handleSearch(e) {
    const query = e.target.value.toLowerCase().trim();
    
    if (!query) {
        resetSearch();
        return;
    }
    
    elements.postItems.forEach(item => {
        const title = item.querySelector('.post-item-title').textContent.toLowerCase();
        const excerpt = item.querySelector('.post-item-excerpt').textContent.toLowerCase();
        const tags = item.getAttribute('data-tags').toLowerCase();
        
        const isMatch = title.includes(query) || excerpt.includes(query) || tags.includes(query);
        
        if (isMatch) {
            item.style.display = 'block';
            item.style.animation = 'fadeIn 0.3s ease';
        } else {
            item.style.display = 'none';
        }
    });
}

// 重置搜索
function resetSearch() {
    elements.postItems.forEach(item => {
        item.style.display = 'block';
        item.style.animation = '';
    });
}

// 移动端导航
function initMobileNav() {
    elements.navbarToggle.addEventListener('click', () => {
        elements.navbarNavMobile.classList.toggle('show');
        const icon = elements.navbarToggle.querySelector('i');
        if (elements.navbarNavMobile.classList.contains('show')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // 点击导航链接后关闭菜单
    const mobileNavLinks = elements.navbarNavMobile.querySelectorAll('.nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            elements.navbarNavMobile.classList.remove('show');
            const icon = elements.navbarToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// 回到顶部功能
function initBackToTop() {
    // 监听滚动事件
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            elements.backToTop.classList.add('show');
        } else {
            elements.backToTop.classList.remove('show');
        }
    });
    
    // 点击回到顶部
    elements.backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 标签筛选功能
function initTagFilter() {
    if (!elements.tagsList) return;
    
    const tagItems = elements.tagsList.querySelectorAll('.tag-item');
    
    tagItems.forEach(tagItem => {
        tagItem.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 移除所有标签的激活状态
            tagItems.forEach(item => item.classList.remove('active'));
            
            // 添加当前标签的激活状态
            tagItem.classList.add('active');
            
            const selectedTag = tagItem.getAttribute('data-tag');
            
            // 如果点击的是当前激活的标签，则重置筛选
            if (tagItem.classList.contains('active') && 
                tagItem.getAttribute('data-tag') === elements.tagsList.getAttribute('data-active-tag')) {
                resetTagFilter();
                return;
            }
            
            // 保存当前激活的标签
            elements.tagsList.setAttribute('data-active-tag', selectedTag);
            
            // 筛选文章
            elements.postItems.forEach(postItem => {
                const postTags = postItem.getAttribute('data-tags').split(' ');
                
                if (postTags.includes(selectedTag)) {
                    postItem.style.display = 'block';
                    postItem.style.animation = 'fadeIn 0.3s ease';
                } else {
                    postItem.style.display = 'none';
                }
            });
        });
    });
}

// 重置标签筛选
function resetTagFilter() {
    const tagItems = elements.tagsList.querySelectorAll('.tag-item');
    tagItems.forEach(item => item.classList.remove('active'));
    elements.tagsList.removeAttribute('data-active-tag');
    
    elements.postItems.forEach(postItem => {
        postItem.style.display = 'block';
        postItem.style.animation = '';
    });
}

// 代码高亮初始化
function initCodeHighlight() {
    // Highlight.js已经在HTML中通过CDN引入并初始化
    // 这里添加一些自定义配置
    if (typeof hljs !== 'undefined') {
        // 监听DOM变化，确保动态加载的内容也能被高亮
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1) { // 元素节点
                            const codeBlocks = node.querySelectorAll('pre code');
                            codeBlocks.forEach((block) => {
                                hljs.highlightElement(block);
                            });
                        }
                    });
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
}

// 页面加载完成事件
function initPageLoad() {
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 图片懒加载
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    imageObserver.unobserve(image);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// 键盘快捷键
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K 打开搜索
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            elements.searchToggle.click();
        }
        
        // ESC 关闭搜索或移动端菜单
        if (e.key === 'Escape') {
            if (elements.searchContainer.classList.contains('show')) {
                closeSearch();
            }
            
            if (elements.navbarNavMobile.classList.contains('show')) {
                elements.navbarToggle.click();
            }
        }
        
        // Ctrl/Cmd + T 切换主题
        if ((e.ctrlKey || e.metaKey) && e.key === 't') {
            e.preventDefault();
            elements.themeToggle.click();
        }
    });
}

// 初始化所有功能
function initAllFeatures() {
    console.log('初始化个人知识库系统功能...');
    
    // 初始化各个功能模块
    initThemeToggle();
    initSearch();
    initMobileNav();
    initBackToTop();
    initTagFilter();
    initCodeHighlight();
    initPageLoad();
    initKeyboardShortcuts();
    
    console.log('个人知识库系统功能初始化完成！');
}

// 页面DOM加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllFeatures);
} else {
    initAllFeatures();
}
