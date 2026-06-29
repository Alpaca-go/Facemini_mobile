import { useRef, useState } from 'react'
import './App.css'

const historyItems = [
  {
    src: '/assets/history/history-1.png',
    alt: '历史缩略图 1',
    prompt: '一个完全由玻璃制成的房间，里面下着雨，雨滴落在玻璃地板上开出一朵朵冰晶玫瑰。',
    meta: '18:39',
  },
  {
    src: '/assets/history/history-2.jpg',
    alt: '历史缩略图 2',
    prompt: '废弃工厂内，所有机器都已经生锈，只有一盏吊灯还亮着，照亮地上一张黑白照片。',
    meta: '11:04',
  },
  {
    src: '/assets/history/history-3.jpg',
    alt: '历史缩略图 3',
    prompt: '秋天的森林里，一只狐狸的尾巴扫过落叶，落叶没有落地而是飘向了空中的月亮。',
    meta: '21:23',
  },
  {
    src: '/assets/history/history-4.jpg',
    alt: '历史缩略图 4',
    prompt: '地下的蘑菇森林，蘑菇的菌丝连接着老式电话机，两个蘑菇之间正在传递一封手写信。',
    meta: '21:22',
  },
  {
    src: '/assets/history/history-5.jpg',
    alt: '历史缩略图 5',
    prompt: '河边的洗衣石上，一只青蛙穿着人类的小西装，手里拿着怀表，焦急地等待什么。',
    meta: '21:07',
  },
  {
    src: '/assets/history/history-6.jpg',
    alt: '历史缩略图 6',
    prompt: '古老的城堡的庭院里，一口枯井里传出钢琴声，往下看，井底有一架发光的三角钢琴。',
    meta: '20:55',
  },
  {
    src: '/assets/history/history-7.png',
    alt: '历史缩略图 7',
    prompt: '加两个人',
    meta: '3 条上下文 · 20:38',
  },
  {
    src: '/assets/history/history-8.svg',
    alt: '历史缩略图 8',
    prompt: '时尚斑马在水里吐泡泡，水下写实摄影，高级广告质感',
    meta: '19:42',
  },
]

const historyFeedItems = [...historyItems, ...historyItems].map((item, index) => ({
  ...item,
  id: `${index + 1}-${item.meta}`,
}))

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
  { key: 'image', label: '图片灵感', width: 73 },
  { key: 'video', label: '视频灵感', width: 73 },
  { key: 'digital-human', label: '数字人形象', width: 86 },
  { key: 'trend', label: '爆款图文', width: 72 },
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

const inspirationVideoItems = Array.from({ length: 4 }, (_, index) => ({
  src: `/assets/video/video-${index + 1}.jpg`,
  alt: `视频灵感 ${index + 1}`,
}))

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

const imageGenerateModelItems = ['GPT Image 2', 'Nano Banana Pro', 'Flux 2 Pro', 'Imagen 4 Fast', 'Seedream 4.5']
const imageGenerateRatioItems = ['1:1', '3:4', '4:3', '9:16', '16:9']
const imageGenerateClarityItems = ['1K', '2K', '4K']
const videoGenerateModelItems = ['Veo 3.1 Fast', 'Veo 3.1 Lite', 'Kling 3.0 Std', 'Kling 3.0 Pro', 'Kling 3.0 4K', 'Wan 2.7 720P']
const videoGenerateRatioItems = ['1:1', '3:4', '4:3', '9:16', '16:9']
const videoGenerateDurationItems = ['3s', '4s', '5s', '6s', '8s', '10s', '15s']

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
  const [plazaGenerateVariant, setPlazaGenerateVariant] = useState('image')
  const [isModelMode, setIsModelMode] = useState(false)
  const [activeMenu, setActiveMenu] = useState(null)
  const [isRadialMenuOpen, setIsRadialMenuOpen] = useState(false)
  const [selectedModel, setSelectedModel] = useState(modelMenuItems[0])
  const [selectedThinking, setSelectedThinking] = useState(thinkingMenuItems[1])
  const [activeImageGenerateMenu, setActiveImageGenerateMenu] = useState(null)
  const [selectedImageModel, setSelectedImageModel] = useState(imageGenerateModelItems[0])
  const [selectedImageRatio, setSelectedImageRatio] = useState(imageGenerateRatioItems[0])
  const [selectedImageClarity, setSelectedImageClarity] = useState(imageGenerateClarityItems[0])
  const [selectedVideoModel, setSelectedVideoModel] = useState(videoGenerateModelItems[2])
  const [selectedVideoRatio, setSelectedVideoRatio] = useState(videoGenerateRatioItems[4])
  const [selectedVideoDuration, setSelectedVideoDuration] = useState(videoGenerateDurationItems[3])

  const isVideoInspirationTab = activeInspirationTab === inspirationTabs[1].label

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
    setPlazaGenerateVariant('image')
    setActiveImageGenerateMenu(null)
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
    setPlazaGenerateVariant('image')
    setActiveImageGenerateMenu(null)
    setActiveView(view)
  }

  const handleOpenPlazaGenerate = (variant) => {
    setActiveMenu(null)
    setIsModelMode(false)
    setIsRadialMenuOpen(false)
    setActiveView('plaza')
    if (variant === 'video') {
      setActiveInspirationTab(inspirationTabs[1].label)
    }
    if (variant === 'image') {
      setActiveInspirationTab(inspirationTabs[0].label)
    }
    setIsPlazaScrollMode(true)
    setPlazaGenerateVariant(variant ?? (isVideoInspirationTab ? 'video' : 'image'))
    setActiveImageGenerateMenu(null)
    setIsPlazaGenerateMode(true)
  }

  const handleClosePlazaGenerate = () => {
    setIsPlazaGenerateMode(false)
    setPlazaGenerateVariant('image')
    setActiveImageGenerateMenu(null)
  }

  const handleOpenHomeComposer = () => {
    setActiveMenu(null)
    setIsPlazaGenerateMode(false)
    setPlazaGenerateVariant('image')
    setIsPlazaScrollMode(false)
    setActiveImageGenerateMenu(null)
    setIsRadialMenuOpen(false)
    setActiveView('home')
    setIsModelMode(true)
  }

  const handleGoHome = () => {
    setActiveMenu(null)
    setIsModelMode(false)
    setIsRadialMenuOpen(false)
    setIsPlazaScrollMode(false)
    setIsPlazaGenerateMode(false)
    setPlazaGenerateVariant('image')
    setActiveImageGenerateMenu(null)
    setActiveView('home')
  }

  const handleToggleImageGenerateMenu = (menu) => {
    setActiveImageGenerateMenu((currentMenu) => (currentMenu === menu ? null : menu))
  }

  return (
    <main className="page-shell">
      <section
        className={`phone-home${activeView === 'home' && isModelMode ? ' is-model' : ''}${activeView === 'plaza' ? ' is-plaza' : ''}${activeView === 'plaza' && isPlazaScrollMode ? ' is-plaza-scrolled' : ''}${activeView === 'plaza' && isPlazaGenerateMode ? ' is-plaza-generate' : ''}${activeView === 'history' ? ' is-history' : ''}`}
        aria-label="Facemini 首页"
      >
        {activeView === 'home' ? <HeroBackground /> : null}
        <Header showClose={activeView === 'plaza' && isPlazaGenerateMode} onClose={handleClosePlazaGenerate} onHomeClick={handleGoHome} />

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
            <KeyboardPanel visible={isModelMode} />
          </>
        ) : activeView === 'plaza' ? (
          <>
            <InspirationPlaza
              activeTab={activeInspirationTab}
              generateMode={isPlazaGenerateMode}
              generateVariant={plazaGenerateVariant}
              onSelectTab={setActiveInspirationTab}
              onScrollModeChange={setIsPlazaScrollMode}
            />
            <PlazaGenerateComposer
              visible={isPlazaGenerateMode}
              variant={plazaGenerateVariant}
              activeMenu={activeImageGenerateMenu}
              selectedImageModel={selectedImageModel}
              selectedImageRatio={selectedImageRatio}
              selectedImageClarity={selectedImageClarity}
              selectedVideoModel={selectedVideoModel}
              selectedVideoRatio={selectedVideoRatio}
              selectedVideoDuration={selectedVideoDuration}
              onToggleMenu={handleToggleImageGenerateMenu}
            />
            <PlazaGenerateDropdownLayer
              visible={isPlazaGenerateMode}
              variant={plazaGenerateVariant}
              activeMenu={activeImageGenerateMenu}
              selectedModel={selectedImageModel}
              selectedRatio={selectedImageRatio}
              selectedClarity={selectedImageClarity}
              selectedVideoModel={selectedVideoModel}
              selectedVideoRatio={selectedVideoRatio}
              selectedVideoDuration={selectedVideoDuration}
              onClose={() => setActiveImageGenerateMenu(null)}
              onSelectModel={setSelectedImageModel}
              onSelectRatio={setSelectedImageRatio}
              onSelectClarity={setSelectedImageClarity}
              onSelectVideoModel={setSelectedVideoModel}
              onSelectVideoRatio={setSelectedVideoRatio}
              onSelectVideoDuration={setSelectedVideoDuration}
            />
            <KeyboardPanel visible={isPlazaGenerateMode} />
          </>
        ) : activeView === 'history' ? (
          <HistoryPage onCreate={handleOpenHomeComposer} />
        ) : (
          <></>
        )}

        <BottomNavShadow />
        <BottomNav activeView={activeView} onChangeView={handleChangeView} onToggleRadialMenu={handleToggleRadialMenu} />
        <PlazaPrompt visible={activeView === 'plaza' && isPlazaScrollMode && !isPlazaGenerateMode} onActivate={() => handleOpenPlazaGenerate()} />
        {isRadialMenuOpen ? (
          <RadialMenuOverlay
            onClose={() => setIsRadialMenuOpen(false)}
            onOpenImageGenerate={() => handleOpenPlazaGenerate('image')}
            onOpenVideoGenerate={() => handleOpenPlazaGenerate('video')}
            onOpenModel={handleOpenHomeComposer}
          />
        ) : null}
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

function Header({ showClose = false, onClose, onHomeClick }) {
  return (
    <header className="header">
      <a
        className="brand-lockup"
        href="/"
        aria-label="返回首页"
        onClick={(event) => {
          event.preventDefault()
          onHomeClick?.()
        }}
      >
        <span className="brand-name">Facemini</span>
        <span className="beta-badge">Beta</span>
      </a>

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

function InspirationPlaza({ activeTab, generateMode, generateVariant, onSelectTab, onScrollModeChange }) {
  const gridRef = useRef(null)
  const isVideoTab = activeTab === inspirationTabs[1].label
  const isEmptyTab = activeTab === inspirationTabs[2].label || activeTab === inspirationTabs[3].label
  const isVideoGenerate = generateMode && generateVariant === 'video'
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
          <div className={`plaza-generate-heading${isVideoGenerate ? ' plaza-generate-heading--video' : ''}`}>
            <h1>{isVideoGenerate ? '哇！大师，来做视频啦' : '哇！大师，来做图啦'}</h1>
            <p>今天想创作什么呢?</p>
          </div>
          <div className={`plaza-generate-fade${isVideoGenerate ? ' plaza-generate-fade--video' : ''}`} aria-hidden="true" />
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
        className={`inspiration-grid${generateMode ? ' inspiration-grid--generate' : ''}${isVideoTab ? ' inspiration-grid--video' : ''}`}
        aria-label="灵感图片"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onLostPointerCapture={handlePointerEnd}
        onScroll={handleScroll}
      >
        {isEmptyTab ? <InspirationEmptyGrid /> : isVideoTab ? <InspirationVideoGrid /> : <InspirationImageGrid />}
      </div>
    </section>
  )
}

function InspirationImageGrid() {
  return inspirationColumns.map((column, columnIndex) => (
    <div className="inspiration-column" key={`column-${columnIndex}`}>
      {column.map((item) => (
        <img className="inspiration-card" key={item.src} src={item.src} alt={item.alt} draggable="false" />
      ))}
    </div>
  ))
}

function InspirationVideoGrid() {
  return (
    <div className="inspiration-video-list">
      {inspirationVideoItems.map((item) => (
        <img className="inspiration-video-card" key={item.src} src={item.src} alt={item.alt} draggable="false" />
      ))}
    </div>
  )
}

function InspirationEmptyGrid() {
  return <div className="inspiration-empty-grid" aria-hidden="true" />
}

function HistoryPage({ onCreate }) {
  return (
    <section className="history-page" aria-label="历史记录页面">
      <div className="history-toolbar">
        <h1>历史记录</h1>
        <button className="history-create-button" type="button" onClick={onCreate}>
          <PlusIcon />
          <span>新创作</span>
        </button>
      </div>
      <div className="history-list">
        {historyFeedItems.map((item) => (
          <HistoryListItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}

function HistoryListItem({ item }) {
  return (
    <article className="history-card">
      <div className="history-card-thumb">
        <img src={item.src} alt={item.alt} draggable="false" />
      </div>
      <div className="history-card-copy">
        <p>{item.prompt}</p>
        <span>{item.meta}</span>
      </div>
    </article>
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

function PlazaGenerateComposer({
  visible,
  variant,
  activeMenu,
  selectedImageModel,
  selectedImageRatio,
  selectedImageClarity,
  selectedVideoModel,
  selectedVideoRatio,
  selectedVideoDuration,
  onToggleMenu,
}) {
  const isVideo = variant === 'video'

  return (
    <section className={`plaza-generate-composer${visible ? ' is-visible' : ''}`} aria-hidden={visible ? 'false' : 'true'}>
      <textarea className="plaza-generate-input" aria-label="描述你想生成的内容" placeholder="描述你想生成的内容……" />
      <div className="plaza-generate-controls">
        <button className="square-tool" type="button" aria-label="添加">
          <PlusIcon />
        </button>
        <button
          className={`image-model-tool${isVideo ? ' image-model-tool--video' : ''}${activeMenu === 'model' ? ' is-open' : ''}`}
          type="button"
          onClick={() => onToggleMenu('model')}
        >
          <LayersIcon />
          <span>{isVideo ? selectedVideoModel : selectedImageModel}</span>
          <ChevronIcon />
        </button>
        <button
          className={`image-size-tool${isVideo ? ' image-size-tool--video' : ''}${activeMenu === 'size' ? ' is-open' : ''}`}
          type="button"
          onClick={() => onToggleMenu('size')}
        >
          <SlidersIcon />
          <span>{isVideo ? `${selectedVideoRatio} | ${selectedVideoDuration}` : `${selectedImageRatio} | ${selectedImageClarity}`}</span>
          <ChevronIcon />
        </button>
        <button className="image-submit-tool" type="button" aria-label={isVideo ? '生成视频' : '生成图片'}>
          <span className={`image-submit-badge${isVideo ? ' image-submit-badge--video' : ''}`}>{isVideo ? '720积分' : '24积分'}</span>
          <img className="submit-tool-icon" src="/assets/icon-model-flash.svg?v=3" alt="" />
          <span className="image-submit-text">生成</span>
        </button>
      </div>
    </section>
  )
}

function PlazaGenerateDropdownLayer({
  visible,
  variant,
  activeMenu,
  selectedModel,
  selectedRatio,
  selectedClarity,
  selectedVideoModel,
  selectedVideoRatio,
  selectedVideoDuration,
  onClose,
  onSelectModel,
  onSelectRatio,
  onSelectClarity,
  onSelectVideoModel,
  onSelectVideoRatio,
  onSelectVideoDuration,
}) {
  if (!visible || !activeMenu) {
    return null
  }

  const isVideo = variant === 'video'

  return (
    <div className="plaza-generate-dropdown-layer" aria-hidden="false">
      <button className="plaza-generate-dropdown-backdrop" type="button" aria-label="关闭下拉菜单" onClick={onClose} />
      {!isVideo && activeMenu === 'model' ? (
        <div className="plaza-generate-dropdown plaza-generate-dropdown--model">
          {imageGenerateModelItems.map((item) => (
            <button
              className={`plaza-generate-option${selectedModel === item ? ' is-selected' : ''}`}
              type="button"
              key={item}
              onClick={() => {
                onSelectModel(item)
                onClose()
              }}
            >
              <span>{item}</span>
              {selectedModel === item ? <CheckIcon /> : null}
            </button>
          ))}
        </div>
      ) : null}
      {!isVideo && activeMenu === 'size' ? (
        <ImageSizeDropdownPanel
          selectedRatio={selectedRatio}
          selectedClarity={selectedClarity}
          onSelectRatio={onSelectRatio}
          onSelectClarity={onSelectClarity}
        />
      ) : null}
      {isVideo && activeMenu === 'model' ? (
        <VideoDropdownPanel
          className="plaza-generate-dropdown--video-model"
          items={videoGenerateModelItems}
          selectedItem={selectedVideoModel}
          onSelect={(item) => {
            onSelectVideoModel(item)
            onClose()
          }}
        />
      ) : null}
      {isVideo && activeMenu === 'size' ? (
        <VideoSettingDropdownPanel
          selectedRatio={selectedVideoRatio}
          selectedDuration={selectedVideoDuration}
          onSelectRatio={onSelectVideoRatio}
          onSelectDuration={onSelectVideoDuration}
        />
      ) : null}
    </div>
  )
}

function VideoDropdownPanel({ className, items, selectedItem, onSelect }) {
  return (
    <div className={`plaza-generate-dropdown video-generate-dropdown ${className}`}>
      {items.map((item) => (
        <button
          className={`plaza-generate-option video-generate-option${selectedItem === item ? ' is-selected' : ''}`}
          type="button"
          key={item}
          onClick={() => onSelect(item)}
        >
          <span>{item}</span>
          {selectedItem === item ? <CheckIcon /> : null}
        </button>
      ))}
    </div>
  )
}

function VideoSettingDropdownPanel({ selectedRatio, selectedDuration, onSelectRatio, onSelectDuration }) {
  return (
    <div className="plaza-generate-dropdown video-setting-dropdown">
      <div className="video-setting-section">
        <h3>视频比例</h3>
        <div className="video-ratio-board">
          {videoGenerateRatioItems.map((item) => (
            <VideoRatioOption key={item} label={item} selected={selectedRatio === item} onSelect={() => onSelectRatio(item)} />
          ))}
        </div>
      </div>
      <div className="video-setting-section video-setting-section--duration">
        <h3>视频时长</h3>
        <div className="video-duration-board">
          {videoGenerateDurationItems.map((item) => (
            <VideoDurationOption key={item} label={item} selected={selectedDuration === item} onSelect={() => onSelectDuration(item)} />
          ))}
        </div>
      </div>
    </div>
  )
}

function VideoRatioOption({ label, selected, onSelect }) {
  return (
    <button className={`video-ratio-card${selected ? ' is-selected' : ''}`} type="button" onClick={onSelect}>
      <span className={`video-ratio-icon video-ratio-icon--${label.replace(':', '-')}`} aria-hidden="true" />
      <span className="video-ratio-label">{label}</span>
    </button>
  )
}

function VideoDurationOption({ label, selected, onSelect }) {
  return (
    <button className={`video-duration-chip${selected ? ' is-selected' : ''}`} type="button" onClick={onSelect}>
      {label}
    </button>
  )
}

function ImageSizeDropdownPanel({ selectedRatio, selectedClarity, onSelectRatio, onSelectClarity }) {
  return (
    <div className="plaza-generate-dropdown plaza-generate-dropdown--size">
      <div className="size-panel-section">
        <h3>图片比例</h3>
        <div className="size-ratio-board">
          {imageGenerateRatioItems.map((item) => (
            <RatioOption key={item} label={item} selected={selectedRatio === item} onSelect={() => onSelectRatio(item)} />
          ))}
        </div>
      </div>
      <div className="size-panel-section size-panel-section--clarity">
        <h3>清晰度</h3>
        <div className="size-clarity-board">
          {imageGenerateClarityItems.map((item) => (
            <ClarityOption key={item} label={item} selected={selectedClarity === item} onSelect={() => onSelectClarity(item)} />
          ))}
        </div>
      </div>
    </div>
  )
}

function RatioOption({ label, selected, onSelect }) {
  return (
    <button className={`size-ratio-card${selected ? ' is-selected' : ''}`} type="button" onClick={onSelect}>
      <span className={`size-ratio-icon size-ratio-icon--${label.replace(':', '-')}`} aria-hidden="true" />
      <span className="size-ratio-label">{label}</span>
    </button>
  )
}

function ClarityOption({ label, selected, onSelect }) {
  return (
    <button className={`size-clarity-chip${selected ? ' is-selected' : ''}`} type="button" onClick={onSelect}>
      {label}
    </button>
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
        <button className={`nav-item${activeView === item.key ? ' is-active' : ''}`} type="button" key={item.label} onClick={() => onChangeView(item.key)}>
          <img className="tabbar-icon" src={item.iconSrc} alt="" />
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  )
}

function RadialMenuOverlay({ onClose, onOpenImageGenerate, onOpenVideoGenerate, onOpenModel }) {
  return (
    <div className="radial-menu-overlay">
      <button className="radial-backdrop" type="button" aria-label="关闭菜单" onClick={onClose} />
      <div className="radial-menu-outer">
        {radialOuterItems.map((item) => (
          <RadialMenuItem className={item.className} icon={item.icon} key={item.label} label={item.label} />
        ))}
      </div>
      <div
        className="radial-menu-inner"
        onClick={(event) => {
          const button = event.target.closest('.radial-item')

          if (!button) {
            return
          }

          if (button.classList.contains('radial-item--inner-top')) {
            onOpenImageGenerate()
          }

          if (button.classList.contains('radial-item--inner-left')) {
            onOpenModel()
          }

          if (button.classList.contains('radial-item--inner-right')) {
            onOpenVideoGenerate()
          }
        }}
      >
        {radialInnerItems.map((item) => (
          <RadialMenuItem
            className={item.className}
            icon={item.icon}
            key={item.label}
            label={item.label}
            onClick={item.label === '图片生成' ? onOpenImageGenerate : item.label === '大模型' ? onOpenModel : undefined}
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
