import { useState } from 'react'
import './App.css'

const showcaseCards = [
  { className: 'showcase-card showcase-card--invite', src: '/assets/invite.png', alt: '邀请有礼' },
  { className: 'showcase-card showcase-card--image-video', src: '/assets/image-video.png', alt: '图片视频生成' },
  { className: 'showcase-card showcase-card--oral-video', src: '/assets/oral-video.png', alt: '口播视频一键生成' },
]

const quickActions = [
  { src: '/assets/quick-media.png', label: '自媒体创作' },
  { src: '/assets/quick-ecommerce.png', label: '电商美工' },
  { src: '/assets/quick-host.png', label: '虚拟主播' },
  { src: '/assets/quick-copy.png', label: '文案带货' },
]

const navItems = [
  { key: 'home', label: '首页', iconSrc: '/assets/icon-tabbar-01-home.svg' },
  { key: 'plaza', label: '广场', iconSrc: '/assets/icon-tabbar-02-plaza.svg' },
  { key: 'history', label: '历史', iconSrc: '/assets/icon-tabbar-04-history.svg' },
  { key: 'mine', label: '我的', iconSrc: '/assets/icon-tabbar-05-mine.svg' },
]

const inspirationTabs = [
  { label: '图片灵感', width: 73 },
  { label: '视频灵感', width: 73 },
  { label: '数字人形象', width: 86 },
  { label: '爆款图文', width: 72 },
]

const inspirationColumns = [
  [
    { src: '/assets/inspiration-01.png', alt: '灵感图片 1', height: 296 },
    { src: '/assets/inspiration-03.png', alt: '灵感图片 2', height: 272 },
    { src: '/assets/inspiration-05.png', alt: '灵感图片 3', height: 322 },
  ],
  [
    { src: '/assets/inspiration-02.png', alt: '灵感图片 4', height: 225 },
    { src: '/assets/inspiration-04.png', alt: '灵感图片 5', height: 322 },
    { src: '/assets/inspiration-06.png', alt: '灵感图片 6', height: 241 },
  ],
]

const modelPrompts = ['指导我建立个人知识库', '给我一些关于初次创业的建议吧', '帮我提升文案的吸引力']

const modelMenuItems = [
  'DeepSeek V4 Pro',
  'Qwen 3.6 Plus',
  'Qwen 3.7 Plus',
  'GPT-5.4 codex',
  'GPT-5.5 codex',
  'Gemini 3 Pro',
  'Gemini 3.1 Pro',
  'Claude Sonnet 4.6',
  'Claude Opus 4.6',
]

const thinkingMenuItems = ['标准', '深度思考']

const radialOuterItems = [
  { label: '视频换脸', className: 'radial-item--outer-left', icon: <VideoSwapIcon /> },
  { label: '动作迁移', className: 'radial-item--outer-upper-left', icon: <MotionTransferIcon /> },
  { label: '数字人', className: 'radial-item--outer-top-left', icon: <DigitalHumanIcon /> },
  { label: '爆款图文', className: 'radial-item--outer-top-right', icon: <ViralTextIcon /> },
  { label: '营销工具', className: 'radial-item--outer-upper-right', icon: <MarketingIcon /> },
  { label: '音频处理', className: 'radial-item--outer-right', icon: <AudioProcessIcon /> },
]

const radialInnerItems = [
  { label: '图片生成', className: 'radial-item--inner-top', icon: <ImageGenerateIcon /> },
  { label: '大模型', className: 'radial-item--inner-left', icon: <ModelGenerateIcon /> },
  { label: '视频生成', className: 'radial-item--inner-right', icon: <VideoGenerateIcon /> },
]

export default function App() {
  const [activeView, setActiveView] = useState('home')
  const [activeInspirationTab, setActiveInspirationTab] = useState(inspirationTabs[0].label)
  const [isModelMode, setIsModelMode] = useState(false)
  const [activeMenu, setActiveMenu] = useState(null)
  const [isRadialMenuOpen, setIsRadialMenuOpen] = useState(false)
  const [selectedModel, setSelectedModel] = useState(modelMenuItems[0])
  const [selectedThinking, setSelectedThinking] = useState(thinkingMenuItems[1])

  const handleDismissModel = () => {
    document.activeElement?.blur()
    if (activeMenu) {
      setActiveMenu(null)
      return
    }

    setIsModelMode(false)
  }

  const handleToggleRadialMenu = () => {
    setActiveMenu(null)
    setIsModelMode(false)
    setIsRadialMenuOpen((isOpen) => !isOpen)
  }

  const handleActivateModel = () => {
    setIsRadialMenuOpen(false)
    setIsModelMode(true)
  }

  const handleToggleMenu = (menu) => {
    setIsModelMode(true)
    setActiveMenu((currentMenu) => (currentMenu === menu ? null : menu))
  }

  const handleChangeView = (view) => {
    setActiveMenu(null)
    setIsModelMode(false)
    setIsRadialMenuOpen(false)
    setActiveView(view)
  }

  return (
    <main className="page-shell">
      <section className={`phone-home${activeView === 'home' && isModelMode ? ' is-model' : ''}${activeView === 'plaza' ? ' is-plaza' : ''}`} aria-label="Facemini 首页">
        {activeView === 'home' ? <HeroBackground /> : null}
        <Header />

        {activeView === 'home' ? (
          <>
            <ModelDismissZone onDismiss={handleDismissModel} />
            <IntroComposer
              activeMenu={activeMenu}
              selectedModel={selectedModel}
              selectedThinking={selectedThinking}
              onActivateModel={handleActivateModel}
              onToggleMenu={handleToggleMenu}
            />
            <ModelDropdownLayer
              activeMenu={activeMenu}
              selectedModel={selectedModel}
              selectedThinking={selectedThinking}
              onSelectModel={setSelectedModel}
              onSelectThinking={setSelectedThinking}
              onCloseMenu={() => setActiveMenu(null)}
            />
            <ModelSuggestions />
            <ShowcaseGrid />
            <QuickActions />
            <ModelFade />
            <KeyboardPanel />
          </>
        ) : (
          <InspirationPlaza activeTab={activeInspirationTab} onSelectTab={setActiveInspirationTab} />
        )}

        <BottomNavShadow />
        <BottomNav activeView={activeView} onChangeView={handleChangeView} onToggleRadialMenu={handleToggleRadialMenu} />
        {isRadialMenuOpen ? <RadialMenuOverlay onClose={() => setIsRadialMenuOpen(false)} /> : null}
      </section>
    </main>
  )
}

function ModelDismissZone({ onDismiss }) {
  return <button className="model-dismiss-zone" type="button" aria-label="返回首页状态" onPointerDown={onDismiss} />
}

function HeroBackground() {
  return (
    <>
      <div className="hero-bg" />
      <div className="hero-gradient" />
    </>
  )
}

function Header() {
  return (
    <header className="header">
      <div className="brand-lockup">
        <span className="brand-name">Facemini</span>
        <span className="beta-badge">Beta</span>
      </div>

      <div className="account-area">
        <div className="energy-pill" aria-label="能量 666">
          <img className="energy-icon" src="/assets/icon-header-flash.svg" alt="" />
          <span>666</span>
        </div>
        <img className="avatar" src="/assets/avatar.png" alt="用户头像" />
      </div>
    </header>
  )
}

function IntroComposer({ activeMenu, selectedModel, selectedThinking, onActivateModel, onToggleMenu }) {
  return (
    <section className="intro-composer">
      <div className="headline">
        <h1>Hi，我是 Facemini</h1>
        <p>今天想创作什么呢?</p>
      </div>

      <div className="composer" onPointerDown={onActivateModel}>
        <textarea className="composer-input" aria-label="描述你想生成的内容" placeholder="描述你想生成的内容......" onFocus={onActivateModel} />
        <div className="composer-controls">
          <button className="square-tool" type="button" aria-label="添加">
            <PlusIcon />
          </button>
          <button className={`model-tool${activeMenu === 'model' ? ' is-open' : ''}`} type="button" onClick={() => onToggleMenu('model')}>
            <LayersIcon />
            <span>{selectedModel}</span>
            <ChevronIcon />
          </button>
          <button className={`thinking-tool${activeMenu === 'thinking' ? ' is-open' : ''}`} type="button" onClick={() => onToggleMenu('thinking')}>
            <SlidersIcon />
            <span>{selectedThinking}</span>
            <ChevronIcon />
          </button>
          <button className="submit-tool" type="button" aria-label="生成">
            <img className="submit-tool-icon" src="/assets/icon-model-flash.svg?v=3" alt="" />
          </button>
        </div>
      </div>
    </section>
  )
}

function InspirationPlaza({ activeTab, onSelectTab }) {
  return (
    <section className="inspiration-page" aria-label="灵感广场">
      <div className="inspiration-heading">
        <h1>灵感广场</h1>
        <div className="inspiration-tabs" role="tablist" aria-label="灵感分类">
          {inspirationTabs.map((tab) => (
            <button
              className={`inspiration-tab${activeTab === tab.label ? ' is-active' : ''}`}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.label}
              key={tab.label}
              style={{ width: `${tab.width}px` }}
              onClick={() => onSelectTab(tab.label)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="inspiration-grid" aria-label="灵感图片">
        {inspirationColumns.map((column, columnIndex) => (
          <div className="inspiration-column" key={`column-${columnIndex}`}>
            {column.map((item) => (
              <img className="inspiration-card" style={{ height: `${item.height}px` }} key={item.src} src={item.src} alt={item.alt} />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

function ModelDropdownLayer({ activeMenu, selectedModel, selectedThinking, onSelectModel, onSelectThinking, onCloseMenu }) {
  if (!activeMenu) {
    return null
  }

  return (
    <div className="dropdown-layer" aria-hidden="false">
      {activeMenu === 'model' ? (
        <div className="model-dropdown model-dropdown--model">
          {modelMenuItems.map((item) => (
            <button
              className={`dropdown-option${selectedModel === item ? ' is-selected' : ''}`}
              type="button"
              key={item}
              onClick={() => {
                onSelectModel(item)
                onCloseMenu()
              }}
            >
              <span>{item}</span>
              {selectedModel === item ? <CheckIcon /> : null}
            </button>
          ))}
        </div>
      ) : null}

      {activeMenu === 'thinking' ? (
        <div className="model-dropdown model-dropdown--thinking">
          {thinkingMenuItems.map((item) => (
            <button
              className={`dropdown-option${selectedThinking === item ? ' is-selected' : ''}`}
              type="button"
              key={item}
              onClick={() => {
                onSelectThinking(item)
                onCloseMenu()
              }}
            >
              <span>{item}</span>
              {selectedThinking === item ? <CheckIcon /> : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

function ModelSuggestions() {
  return (
    <div className="model-suggestions" aria-label="推荐提示">
      {modelPrompts.map((prompt, index) => (
        <button className="suggestion-pill" style={{ '--delay': `${120 + index * 90}ms` }} type="button" key={prompt}>
          {prompt}
        </button>
      ))}
    </div>
  )
}

function ModelFade() {
  return <div className="model-input-fade" aria-hidden="true" />
}

function KeyboardPanel() {
  return <img className="keyboard-panel" src="/assets/keyboard-qwerty.jpg" alt="" />
}

function ShowcaseGrid() {
  return (
    <section className="showcase" aria-label="推荐能力">
      {showcaseCards.map((card) => (
        <img className={card.className} key={card.alt} src={card.src} alt={card.alt} />
      ))}
    </section>
  )
}

function QuickActions() {
  return (
    <section className="quick-actions" aria-label="快捷创作入口">
      {quickActions.map((item) => (
        <button className="quick-action" type="button" key={item.label}>
          <img src={item.src} alt="" />
          <span>{item.label}</span>
        </button>
      ))}
    </section>
  )
}

function BottomNavShadow() {
  return <div className="bottom-nav-shadow" aria-hidden="true" />
}

function BottomNav({ activeView, onChangeView, onToggleRadialMenu }) {
  const [home, plaza, history, profile] = navItems

  return (
    <nav className="bottom-nav" aria-label="底部导航">
      {[home, plaza].map((item) => (
        <button className={`nav-item${activeView === item.key ? ' is-active' : ''}`} type="button" key={item.label} onClick={() => onChangeView(item.key)}>
          <img className="tabbar-icon" src={item.iconSrc} alt="" />
          <span>{item.label}</span>
        </button>
      ))}

      <button className="create-action" type="button" aria-label="创作" onClick={onToggleRadialMenu}>
        <span className="create-circle">
          <img className="generate-icon" src="/assets/icon-tabbar-03-generate.svg" alt="" />
        </span>
      </button>

      {[history, profile].map((item) => (
        <button className="nav-item" type="button" key={item.label}>
          <img className="tabbar-icon" src={item.iconSrc} alt="" />
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  )
}

function RadialMenuOverlay({ onClose }) {
  return (
    <div className="radial-menu-overlay">
      <button className="radial-backdrop" type="button" aria-label="关闭菜单" onClick={onClose} />
      <div className="radial-menu-outer">
        {radialOuterItems.map((item) => (
          <RadialMenuItem className={item.className} icon={item.icon} key={item.label} label={item.label} />
        ))}
      </div>
      <div className="radial-menu-inner">
        {radialInnerItems.map((item) => (
          <RadialMenuItem className={item.className} icon={item.icon} key={item.label} label={item.label} />
        ))}
      </div>
      <button className="radial-close-button" type="button" aria-label="关闭菜单" onClick={onClose}>
        <CloseIcon />
      </button>
    </div>
  )
}

function RadialMenuItem({ className, icon, label }) {
  return (
    <button className={`radial-item ${className}`} type="button">
      <span className="radial-item-icon">{icon}</span>
      <span className="radial-item-label">{label}</span>
    </button>
  )
}

function MenuSparkle({ x = 17, y = 5 }) {
  return <path d={`M${x} ${y - 3}c.4 1.6 1.4 2.6 3 3-.1.1-.1.1 0 .1-1.6.4-2.6 1.4-3 3-.4-1.6-1.4-2.6-3-3 1.6-.4 2.6-1.4 3-3Z`} fill="#6129ff" />
}

function VideoSwapIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 9.2V7.8c0-1.5 1.2-2.8 2.8-2.8h5.4C14.8 5 16 6.2 16 7.8v1.4M4.8 12.7v2.8c0 1.6 1.2 2.8 2.8 2.8h5.8c1.6 0 2.8-1.2 2.8-2.8v-2.8" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
      <path d="m16 11 4-2.8v7.6l-4-2.8" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" />
      <MenuSparkle x={18} y={4} />
    </svg>
  )
}

function MotionTransferIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M11.5 18.5 7.2 12.4l-1.3-1.8a2 2 0 1 1 3.3-2.3l1.3 1.8 4.3 6.1a2 2 0 1 1-3.3 2.3ZM7.2 12.4l3.3-2.3M17.7 14.2c1.8-2.3 2.2-5.1 1.1-7.4-.9-1.9-2.6-3.1-4.7-3.6M4.1 5.7c-1.4 1.8-2 4-1.7 6.1" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
      <MenuSparkle x={8} y={4} />
    </svg>
  )
}

function DigitalHumanIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.5" cy="7.2" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4.5 20.4c0-4 2.8-7 6.1-7 1.3 0 2.5.4 3.5 1.1" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
      <path d="M14.6 18.2c1.6-.3 2.8-1.5 3.1-3.1.3 1.6 1.5 2.8 3.1 3.1-1.6.3-2.8 1.5-3.1 3.1-.3-1.6-1.5-2.8-3.1-3.1Z" fill="none" stroke="#6129ff" strokeWidth="1.5" />
      <MenuSparkle x={19} y={5} />
    </svg>
  )
}

function ViralTextIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 5.8h8.4c2 0 3 0 3.8.4.7.4 1.2.9 1.6 1.6.4.8.4 1.8.4 3.8v4.2M8.3 9.2h6.8M8.3 13.1h2.2M19 20.2l-1.7.8a3 3 0 0 1-2.8-.1 3.1 3.1 0 0 0-2.6-.2l-.8.3c-1.2.4-2.4-.5-2.4-1.8V16" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
      <MenuSparkle x={18} y={5} />
    </svg>
  )
}

function MarketingIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M16.2 4.3c-2 .6-3.6 2.2-4.2 4.2M18.8 10.4a7.1 7.1 0 1 1-5.2-5.2M15.1 12a3.1 3.1 0 1 1-3.1-3.1 3.1 3.1 0 0 1 3.1 3.1Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
      <path d="M17 5.2c1.5-.3 2.6-1.4 2.9-2.9.3 1.5 1.4 2.6 2.9 2.9-1.5.3-2.6 1.4-2.9 2.9-.3-1.5-1.4-2.6-2.9-2.9Z" fill="none" stroke="#6129ff" strokeWidth="1.5" />
    </svg>
  )
}

function AudioProcessIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.3 10.7a5.4 5.4 0 0 1-5.3 4.1 5.3 5.3 0 0 1-5.3-5.3V8.1a5.3 5.3 0 0 1 5.3-5.3c.9 0 1.7.2 2.4.6M4.4 16.1l.8.9a8.7 8.7 0 0 0 13.6 0l.8-.9M12 18v2.5M10 21h4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
      <MenuSparkle x={18} y={5} />
    </svg>
  )
}

function ImageGenerateIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m5.8 11.8 1.1-1.2a3.1 3.1 0 0 1 4.2-.3 3 3 0 0 0 3.6.2l2.9-1.8c.9-.6 1.8.1 1.8 1.2v2.4c0 2.2-1.2 3.4-3.4 3.4H8.7c-2.2 0-3.4-1.2-3.4-3.4V7.7c0-2.2 1.2-3.4 3.4-3.4h4.6" fill="none" stroke="#6129ff" strokeLinecap="round" strokeWidth="1.5" />
      <path d="M18 4.6c1.3-.3 2.3-1.3 2.6-2.6.3 1.3 1.3 2.3 2.6 2.6-1.3.3-2.3 1.3-2.6 2.6-.3-1.3-1.3-2.3-2.6-2.6Z" fill="none" stroke="#6129ff" strokeWidth="1.5" />
    </svg>
  )
}

function ModelGenerateIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m8.8 12.1-1.7 4.8 4.8-1.7 6.8-6.8a2.1 2.1 0 0 0-3-3L8.8 12.1ZM13.8 7.3l3 3M7.1 6.1c.2 1.2 1.1 2.1 2.3 2.3-1.2.2-2.1 1.1-2.3 2.3-.2-1.2-1.1-2.1-2.3-2.3 1.2-.2 2.1-1.1 2.3-2.3Z" fill="none" stroke="#6129ff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <MenuSparkle x={5} y={4} />
    </svg>
  )
}

function VideoGenerateIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5.3 8V5.8c0-2 1.1-3.1 3.1-3.1h7.2c2 0 3.1 1.1 3.1 3.1v4.4c0 2-1.1 3.1-3.1 3.1h-2.4M13.5 7.8c-.5-.3-.9 0-.9.6v2.2c0 .6.4.9.9.6l1.8-1.1c.5-.3.5-.8 0-1.1l-1.8-1.1Z" fill="none" stroke="#6129ff" strokeLinecap="round" strokeWidth="1.5" />
      <path d="M7.5 17.2c1.4-.3 2.5-1.4 2.8-2.8.3 1.4 1.4 2.5 2.8 2.8-1.4.3-2.5 1.4-2.8 2.8-.3-1.4-1.4-2.5-2.8-2.8Z" fill="none" stroke="#6129ff" strokeWidth="1.5" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 5 19 19M19 5 5 19" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.55" />
    </svg>
  )
}

function LayersIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 3.8 8 4.4-8 4.4-8-4.4zM4 12.2l8 4.4 8-4.4M4 16.4l8 4.4 8-4.4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}

function SlidersIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h6M14 7h6M4 17h10M18 17h2" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      <circle cx="12" cy="7" r="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="16" cy="17" r="2" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true">
      <path d="m3 4.5 3 3 3-3" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 14 14" aria-hidden="true">
      <path d="M2.5 7 5.5 10 11.5 4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}
