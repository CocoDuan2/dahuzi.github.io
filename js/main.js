// 主题切换功能
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const html = document.documentElement;
    
    // 检查本地存储中的主题偏好
    if (localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }
    
    // 主题切换事件
    themeToggle.addEventListener('click', () => {
        if (html.classList.contains('dark')) {
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    });
}

// 返回顶部按钮功能
function initializeBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    if (!backToTopButton) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.remove('opacity-0', 'invisible');
            backToTopButton.classList.add('opacity-100', 'visible');
        } else {
            backToTopButton.classList.remove('opacity-100', 'visible');
            backToTopButton.classList.add('opacity-0', 'invisible');
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Markdown解析功能
function initializeMarkdownParsing() {
    if (typeof marked === 'undefined') return;
    
    const contentDiv = document.getElementById('markdown-content');
    if (!contentDiv) return;
    
    const markdownContent = contentDiv.textContent.trim();
    
    if (markdownContent) {
        contentDiv.innerHTML = marked.parse(markdownContent);
        
        // 初始化 Mermaid 图表
        if (typeof mermaid !== 'undefined') {
            mermaid.init(undefined, document.querySelectorAll('.mermaid'));
        }
    }
}

// Mermaid初始化
function initializeMermaid() {
    if (typeof mermaid !== 'undefined') {
        mermaid.initialize({ startOnLoad: true });
    }
}

// 页面加载时初始化所有功能
document.addEventListener('DOMContentLoaded', function() {
    initializeThemeToggle();
    initializeBackToTop();
    initializeMarkdownParsing();
    initializeMermaid();
}); 