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
  { label: '首页', iconSrc: '/assets/icon-tabbar-01-home.svg', active: true },
  { label: '广场', iconSrc: '/assets/icon-tabbar-02-plaza.svg' },
  { label: '历史', iconSrc: '/assets/icon-tabbar-04-history.svg' },
  { label: '我的', iconSrc: '/assets/icon-tabbar-05-mine.svg' },
]

const modelPrompts = [
  '指导我建立个人知识库',
  '给我一些关于初次创业的建议吧',
  '帮我提升文案的吸引力',
]

export default function App() {
  const [isModelMode, setIsModelMode] = useState(false)
  const handleDismissModel = () => {
    document.activeElement?.blur()
    setIsModelMode(false)
  }

  return (
    <main className="page-shell">
      <section className={`phone-home${isModelMode ? ' is-model' : ''}`} aria-label="Facemini 首页">
        <HeroBackground />
        <Header />
        <ModelDismissZone onDismiss={handleDismissModel} />
        <IntroComposer onActivateModel={() => setIsModelMode(true)} />
        <ModelSuggestions />
        <ShowcaseGrid />
        <QuickActions />
        <BottomNav />
        <ModelFade />
        <KeyboardPanel />
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

function IntroComposer({ onActivateModel }) {
  return (
    <section className="intro-composer">
      <div className="headline">
        <h1>Hi，我是 Facemini</h1>
        <p>今天想创作什么呢?</p>
      </div>

      <div className="composer" onPointerDown={onActivateModel}>
        <textarea
          className="composer-input"
          aria-label="描述你想生成的内容"
          placeholder="描述你想生成的内容......"
          onFocus={onActivateModel}
        />
        <div className="composer-controls">
          <button className="square-tool" type="button" aria-label="添加">
            <PlusIcon />
          </button>
          <button className="model-tool" type="button">
            <LayersIcon />
            <span>DeepSeek V</span>
            <ChevronIcon />
          </button>
          <button className="thinking-tool" type="button">
            <SlidersIcon />
            <span>深度思考</span>
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

function BottomNav() {
  const [home, plaza, history, profile] = navItems

  return (
    <nav className="bottom-nav" aria-label="底部导航">
      {[home, plaza].map((item) => (
        <button className={`nav-item${item.active ? ' is-active' : ''}`} type="button" key={item.label}>
          <img className="tabbar-icon" src={item.iconSrc} alt="" />
          <span>{item.label}</span>
        </button>
      ))}

      <button className="create-action" type="button" aria-label="创作">
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

function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M13.5 2 5.9 13.1h4.7L9.7 22 18.1 10.2h-4.6L15 2z" fill="currentColor" />
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

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M21.95 8C21.95 8 21.95 13.573 21.95 13.573 21.95 14.435 21.95 14.866 21.884 15.225 21.583 16.857 20.307 18.134 18.675 18.434 18.316 18.5 17.884 18.5 17.022 18.5 17.022 18.5 15.976 18.5 15.976 18.5 15.8 18.5 15.631 18.428 15.51 18.3 15.51 18.3 13.875 16.58 13.875 16.58 13.44 16.121 13.458 15.397 13.916 14.962 13.916 14.962 14.744 14.173 14.744 14.173 15.195 13.743 15.45 13.14 15.45 12.518 15.45 11.275 14.442 10.25 13.2 10.25 11.958 10.25 10.95 11.258 10.95 12.5 10.95 12.5 10.95 12.573 10.95 12.573 10.95 13.168 11.179 13.741 11.588 14.173 11.588 14.173 12.338 14.961 12.338 14.961 12.752 15.397 12.735 16.086 12.3 16.501 12.3 16.501 10.384 18.326 10.384 18.326 10.266 18.438 10.11 18.5 9.947 18.5 9.947 18.5 8.95 18.5 8.95 18.5 8.021 18.5 7.556 18.5 7.17 18.423 5.583 18.108 4.343 16.867 4.027 15.281 3.95 14.894 3.95 14.43 3.95 13.5 3.95 13.5 3.95 9.273 3.95 9.273 3.95 8.074 3.95 7.475 4.11 6.926 4.251 6.441 4.484 5.987 4.794 5.588 5.145 5.137 5.631 4.786 6.603 4.084 6.603 4.084 10.7 1.125 10.7 1.125 12.043 0.155 13.857 0.155 15.2 1.125"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path d="M13.67 7.47C15.584 7.079 17.079 5.584 17.47 3.67 17.478 3.633 17.53 3.633 17.538 3.67 17.929 5.584 19.425 7.079 21.338 7.47 21.375 7.478 21.375 7.53 21.338 7.538 19.425 7.929 17.929 9.425 17.538 11.338 17.53 11.375 17.478 11.375 17.47 11.338 17.079 9.425 15.584 7.929 13.67 7.538 13.633 7.53 13.633 7.478 13.67 7.47Z" fill="currentColor" />
      <path d="M22.279 1.373C22.216 1.067 21.779 1.067 21.716 1.373 21.578 2.049 21.049 2.578 20.373 2.716 20.067 2.779 20.067 3.216 20.373 3.279 21.049 3.417 21.578 3.945 21.716 4.621 21.779 4.927 22.216 4.927 22.279 4.621 22.417 3.945 22.945 3.417 23.621 3.279 23.927 3.216 23.927 2.779 23.621 2.716 22.945 2.578 22.417 2.049 22.279 1.373Z" fill="currentColor" />
    </svg>
  )
}

function PlazaIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8.4 7.7c1.5-.3 2.7-1.5 3-3 .3 1.5 1.5 2.7 3 3-1.5.3-2.7 1.5-3 3-.3-1.5-1.5-2.7-3-3ZM3.6 17c2.8-.6 5-2.8 5.6-5.6.6 2.8 2.8 5 5.6 5.6-2.8.6-5 2.8-5.6 5.6-.6-2.8-2.8-5-5.6-5.6ZM16 13.2c1.7-.3 3-1.6 3.3-3.3.3 1.7 1.6 3 3.3 3.3-1.7.3-3 1.6-3.3 3.3-.3-1.7-1.6-3-3.3-3.3Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.55" />
    </svg>
  )
}

function HistoryIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.968 2.292C18.863 1.782 18.134 1.782 18.03 2.292 17.8 3.419 16.919 4.3 15.792 4.53 15.282 4.634 15.282 5.363 15.792 5.468 16.919 5.698 17.8 6.579 18.03 7.705 18.134 8.216 18.863 8.216 18.968 7.705 19.198 6.579 20.079 5.698 21.205 5.468 21.716 5.363 21.716 4.634 21.205 4.53 20.079 4.3 19.198 3.419 18.968 2.292Z" fill="currentColor" />
      <path d="M17.25 15.75 12 12.25 12 6M21.168 8C21.703 9.225 22 10.578 22 12 22 17.523 17.523 22 12 22 6.477 22 2 17.523 2 12 2 6.477 6.477 2 12 2 12.863 2 13.701 2.109 14.5 2.315" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  )
}

function ProfileIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.968 2.292C18.863 1.782 18.134 1.782 18.03 2.292 17.8 3.419 16.919 4.3 15.792 4.53 15.282 4.634 15.282 5.363 15.792 5.468 16.919 5.698 17.8 6.579 18.03 7.705 18.134 8.216 18.863 8.216 18.968 7.705 19.198 6.579 20.079 5.698 21.205 5.468 21.716 5.363 21.716 4.634 21.205 4.53 20.079 4.3 19.198 3.419 18.968 2.292Z" fill="currentColor" />
      <path d="M5 18.5C8.785 14.444 15.214 14.444 19 18.5M12 12.25C10.758 12.25 9.75 11.242 9.75 10 9.75 8.758 10.758 7.75 12 7.75 13.242 7.75 14.25 8.758 14.25 10 14.25 11.242 13.242 12.25 12 12.25ZM21.168 8C21.703 9.225 22 10.578 22 12 22 17.523 17.523 22 12 22 6.477 22 2 17.523 2 12 2 6.477 6.477 2 12 2 12.863 2 13.701 2.109 14.5 2.315" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  )
}

function WandIcon() {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <path d="M28.3 30.5C31.093 29.93 33.273 27.748 33.843 24.956 33.855 24.903 33.931 24.903 33.943 24.956 34.513 27.748 36.693 29.93 39.483 30.5 39.538 30.51 39.538 30.586 39.483 30.598 36.693 31.17 34.513 33.35 33.943 36.14 33.931 36.193 33.855 36.193 33.843 36.14 33.273 33.35 31.093 31.17 28.3 30.598 28.248 30.586 28.248 30.51 28.3 30.5Z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M11.422 33.235 28.51 16.147 31.455 13.202C32.758 11.9 34.868 11.9 36.17 13.202 37.472 14.503 37.472 16.615 36.17 17.915L33.225 20.862 16.135 37.95C14.835 39.252 12.723 39.252 11.422 37.95 10.12 36.648 10.12 34.538 11.422 33.235ZM28.51 16.147 33.225 20.862" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      <path d="M17.088 14C16.915 13.15 15.7 13.15 15.525 14 15.143 15.878 13.675 17.345 11.797 17.73 10.947 17.903 10.947 19.118 11.797 19.293 13.675 19.675 15.143 21.143 15.525 23.022 15.7 23.872 16.915 23.872 17.088 23.022 17.473 21.143 18.942 19.675 20.818 19.293 21.67 19.118 21.67 17.903 20.818 17.73 18.942 17.345 17.473 15.878 17.088 14Z" fill="currentColor" />
    </svg>
  )
}
