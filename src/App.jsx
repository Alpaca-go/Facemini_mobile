import { useRef, useState } from 'react'
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

const inspirationImages = Array.from({ length: 18 }, (_, index) => ({
  src: `/assets/image/image-${index + 1}.png`,
  alt: `灵感图片 ${index + 1}`,
}))

const inspirationColumns = inspirationImages.reduce(
  (columns, image, index) => {
    columns[index % 2].push(image)
    return columns
  },
  [[], []],
)

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
  { label: '视频换脸', className: 'radial-item--outer-left', icon: <img className="radial-menu-icon-asset" src="/assets/menu/icon-menu-04-faceswap.svg" alt="" /> },
  { label: '动作迁移', className: 'radial-item--outer-upper-left', icon: <img className="radial-menu-icon-asset" src="/assets/menu/icon-menu-05-motiontrance.svg" alt="" /> },
  { label: '数字人', className: 'radial-item--outer-top-left', icon: <img className="radial-menu-icon-asset" src="/assets/menu/icon-menu-06-digitalhuman.svg" alt="" /> },
  { label: '爆款图文', className: 'radial-item--outer-top-right', icon: <img className="radial-menu-icon-asset" src="/assets/menu/icon-menu-07-trend.svg" alt="" /> },
  { label: '营销工具', className: 'radial-item--outer-upper-right', icon: <img className="radial-menu-icon-asset" src="/assets/menu/icon-men--08-marketing.svg" alt="" /> },
  { label: '音频处理', className: 'radial-item--outer-right', icon: <img className="radial-menu-icon-asset" src="/assets/menu/icon-menu-09-sound.svg" alt="" /> },
]

const radialInnerItems = [
  { label: '图片生成', className: 'radial-item--inner-top', icon: <img className="radial-menu-icon-asset" src="/assets/menu/icon-menu-02-generateimage.svg" alt="" /> },
  { label: '大模型', className: 'radial-item--inner-left', icon: <img className="radial-menu-icon-asset" src="/assets/menu/icon-menu-01-model.svg" alt="" /> },
  { label: '视频生成', className: 'radial-item--inner-right', icon: <img className="radial-menu-icon-asset" src="/assets/menu/icon-menu-03-generatevideo.svg" alt="" /> },
]

export default function App() {
  const [activeView, setActiveView] = useState('home')
  const [activeInspirationTab, setActiveInspirationTab] = useState(inspirationTabs[0].label)
  const [isPlazaScrollMode, setIsPlazaScrollMode] = useState(false)
  const [isPlazaGenerateMode, setIsPlazaGenerateMode] = useState(false)
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
    setIsPlazaGenerateMode(false)
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
    setIsPlazaScrollMode(false)
    setIsPlazaGenerateMode(false)
    setActiveView(view)
  }

  const handleOpenPlazaGenerate = () => {
    setActiveMenu(null)
    setIsModelMode(false)
    setIsRadialMenuOpen(false)
    setActiveView('plaza')
    setIsPlazaScrollMode(true)
    setIsPlazaGenerateMode(true)
  }

  const handleClosePlazaGenerate = () => {
    setIsPlazaGenerateMode(false)
  }

  const handleOpenHomeComposer = () => {
    setActiveMenu(null)
    setIsPlazaGenerateMode(false)
    setIsPlazaScrollMode(false)
    setIsRadialMenuOpen(false)
    setActiveView('home')
    setIsModelMode(true)
  }

  return (
    <main className="page-shell">
      <section
        className={`phone-home${activeView === 'home' && isModelMode ? ' is-model' : ''}${activeView === 'plaza' ? ' is-plaza' : ''}${activeView === 'plaza' && isPlazaScrollMode ? ' is-plaza-scrolled' : ''}${activeView === 'plaza' && isPlazaGenerateMode ? ' is-plaza-generate' : ''}`}
        aria-label="Facemini 首页"
      >
        {activeView === 'home' ? <HeroBackground /> : null}
        <Header showClose={activeView === 'plaza' && isPlazaGenerateMode} onClose={handleClosePlazaGenerate} />

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
          <>
            <InspirationPlaza
              activeTab={activeInspirationTab}
              generateMode={isPlazaGenerateMode}
              onSelectTab={setActiveInspirationTab}
              onScrollModeChange={setIsPlazaScrollMode}
            />
            <PlazaGenerateComposer visible={isPlazaGenerateMode} />
            <KeyboardPanel visible={isPlazaGenerateMode} />
          </>
        )}

        <BottomNavShadow />
        <BottomNav activeView={activeView} onChangeView={handleChangeView} onToggleRadialMenu={handleToggleRadialMenu} />
        <PlazaPrompt visible={activeView === 'plaza' && isPlazaScrollMode && !isPlazaGenerateMode} onActivate={handleOpenPlazaGenerate} />
        {isRadialMenuOpen ? <RadialMenuOverlay onClose={() => setIsRadialMenuOpen(false)} onOpenImageGenerate={handleOpenHomeComposer} /> : null}
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

function Header({ showClose = false, onClose }) {
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
        {showClose ? (
          <button className="header-close" type="button" aria-label="关闭" onClick={onClose}>
            <CloseIcon />
          </button>
        ) : null}
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

function InspirationPlaza({ activeTab, generateMode, onSelectTab, onScrollModeChange }) {
  const gridRef = useRef(null)
  const dragStateRef = useRef({
    isDragging: false,
    pointerId: null,
    startY: 0,
    startScrollTop: 0,
  })

  const handlePointerDown = (event) => {
    if (event.pointerType === 'touch') {
      return
    }

    dragStateRef.current = {
      isDragging: true,
      pointerId: event.pointerId,
      startY: event.clientY,
      startScrollTop: event.currentTarget.scrollTop,
    }

    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event) => {
    const state = dragStateRef.current
    if (!state.isDragging || state.pointerId !== event.pointerId) {
      return
    }

    const deltaY = event.clientY - state.startY
    const nextScrollTop = state.startScrollTop - deltaY
    event.currentTarget.scrollTop = nextScrollTop
    onScrollModeChange(nextScrollTop > 24)
    event.preventDefault()
  }

  const handlePointerEnd = (event) => {
    const state = dragStateRef.current
    if (state.pointerId !== event.pointerId) {
      return
    }

    onScrollModeChange(event.currentTarget.scrollTop > 24)

    dragStateRef.current = {
      isDragging: false,
      pointerId: null,
      startY: 0,
      startScrollTop: 0,
    }
  }

  const handleScroll = (event) => {
    if (generateMode) {
      onScrollModeChange(true)
      return
    }

    onScrollModeChange(event.currentTarget.scrollTop > 24)
  }

  return (
    <section className={`inspiration-page${generateMode ? ' inspiration-page--generate' : ''}`} aria-label="灵感广场">
      {generateMode ? (
        <>
          <div className="plaza-generate-heading">
            <h1>哇！大师，来做图啦</h1>
            <p>今天想创作什么呢?</p>
          </div>
          <div className="plaza-generate-fade" aria-hidden="true" />
        </>
      ) : (
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
      )}

      <div
        ref={gridRef}
        className={`inspiration-grid${generateMode ? ' inspiration-grid--generate' : ''}`}
        aria-label="灵感图片"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onLostPointerCapture={handlePointerEnd}
        onScroll={handleScroll}
      >
        {inspirationColumns.map((column, columnIndex) => (
          <div className="inspiration-column" key={`column-${columnIndex}`}>
            {column.map((item) => (
              <img className="inspiration-card" key={item.src} src={item.src} alt={item.alt} draggable="false" />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

function PlazaPrompt({ visible, onActivate }) {
  return (
    <button className={`plaza-prompt${visible ? ' is-visible' : ''}`} type="button" aria-hidden={visible ? 'false' : 'true'} onClick={onActivate}>
      <span>释放你的创作灵感</span>
      <span className="plaza-prompt-action" aria-hidden="true">
        <img className="plaza-prompt-icon" src="/assets/icon-header-flash.svg" alt="" />
      </span>
    </button>
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

function KeyboardPanel({ visible = false }) {
  return <img className={`keyboard-panel${visible ? ' is-visible' : ''}`} src="/assets/keyboard-qwerty.jpg" alt="" />
}

function PlazaGenerateComposer({ visible }) {
  return (
    <section className={`plaza-generate-composer${visible ? ' is-visible' : ''}`} aria-hidden={visible ? 'false' : 'true'}>
      <textarea className="plaza-generate-input" aria-label="描述你想生成的内容" placeholder="描述你想生成的内容……" />
      <div className="plaza-generate-controls">
        <button className="square-tool" type="button" aria-label="添加">
          <PlusIcon />
        </button>
        <button className="image-model-tool" type="button">
          <LayersIcon />
          <span>GPT Image 2</span>
          <ChevronIcon />
        </button>
        <button className="image-size-tool" type="button">
          <SlidersIcon />
          <span>1:1 | 1K</span>
          <ChevronIcon />
        </button>
        <button className="image-submit-tool" type="button" aria-label="生成图片">
          <span className="image-submit-badge">24积分</span>
          <img className="submit-tool-icon" src="/assets/icon-model-flash.svg?v=3" alt="" />
          <span className="image-submit-text">生成</span>
        </button>
      </div>
    </section>
  )
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

function RadialMenuOverlay({ onClose, onOpenImageGenerate }) {
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
          <RadialMenuItem
            className={item.className}
            icon={item.icon}
            key={item.label}
            label={item.label}
            onClick={item.label === '图片生成' || item.label === '大模型' ? onOpenImageGenerate : undefined}
          />
        ))}
      </div>
      <button className="radial-close-button" type="button" aria-label="关闭菜单" onClick={onClose}>
        <CloseIcon />
      </button>
    </div>
  )
}

function RadialMenuItem({ className, icon, label, onClick }) {
  return (
    <button className={`radial-item ${className}`} type="button" onClick={onClick}>
      <span className="radial-item-icon">{icon}</span>
      <span className="radial-item-label">{label}</span>
    </button>
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
