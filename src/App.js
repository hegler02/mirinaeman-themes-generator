import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Palette, Sun, Moon, Image as ImageIcon, Type, Loader, ServerCrash, Wand2, Info, AlertTriangle, CheckCircle, Copy, Download, MessageSquare, Shield, SlidersHorizontal, ChevronDown, X, Smartphone, Tablet, Monitor, Sparkles, ImagePlus, BotMessageSquare, BrainCircuit, RefreshCw, KeyRound, Save, RotateCcw } from 'lucide-react';

// =================================================================
// 전체 구조를 포함한 초기 테마 데이터 (templete_andrei-tarkovsky.json 기반)
// =================================================================
const initialTheme = {
  "id": "tarkovsky-mirror-full",
  "displayName": "타르코프스키의 거울",
  "analysis": "이 테마는 안드레이 타르코프스키 감독의 영화 '거울'에서 영감을 받았습니다. 빛바랜 기억, 물안개 낀 아침, 축축한 흙의 색감을 중심으로, 느리고 명상적인 사용자 경험을 제공하여 철학적인 사색을 유도하는 것을 목표로 합니다.",
  "font": { "primary": "EB Garamond, Noto Serif KR, serif", "title": "Cormorant, Noto Serif KR, serif", "mono": "Menlo, Consolas, Monaco, 'Liberation Mono', 'Lucida Console', monospace" },
  "colors": {
    "light": {
      "basic": {"--theme-body-bg":"#F4F2E9","--theme-section-bg":"#EAE6DB","--theme-card-bg":"#FFFFFF","--theme-text-primary":"#504A40","--theme-text-secondary":"#7A7060","--theme-text-tertiary":"#A0988C","--theme-accent-primary":"#6B8E23","--theme-accent-secondary":"#4682B4","--theme-border-light":"#DCD5C6","--theme-border-medium":"#C0B6A2"},
      "navigation": {"--theme-nav-brand":"#504A40","--theme-nav-link":"#7A7060","--theme-nav-link-hover":"#6B8E23","--theme-nav-mobile-btn":"#504A40","--theme-nav-bg":"rgba(244, 242, 233, 0.9)","--theme-nav-border":"#DCD5C6","--theme-nav-active":"#6B8E23"},
      "interactive": {"--theme-button-primary-bg":"#6B8E23","--theme-button-primary-hover":"#556B2F","--theme-button-primary-text":"#FFFFFF","--theme-button-secondary-bg":"#DCD5C6","--theme-button-secondary-hover":"#C0B6A2","--theme-button-secondary-text":"#504A40","--theme-link-color":"#6B8E23","--theme-link-hover":"#4682B4","--theme-input-bg":"#FFFFFF","--theme-input-border":"#C0B6A2","--theme-input-focus":"#6B8E23","--theme-input-text":"#504A40","--theme-input-placeholder":"#A0988C", "--theme-form-checkbox-accent": "#6B8E23", "--theme-form-radio-accent": "#6B8E23"},
      "cards": {"--theme-card-bg":"#FFFFFF","--theme-card-border":"transparent","--theme-card-title":"#504A40","--theme-card-subtitle":"#7A7060","--theme-card-icon":"#6B8E23","--theme-card-shadow":"0 2px 8px rgba(80, 74, 64, 0.08)"},
      "badges": {"--theme-badge-primary-bg":"rgba(107, 142, 35, 0.1)","--theme-badge-primary-text":"#556B2F","--theme-badge-success-bg":"rgba(85, 107, 47, 0.1)","--theme-badge-success-text":"#445625","--theme-badge-warning-bg":"rgba(184, 134, 11, 0.15)","--theme-badge-warning-text":"#8B4513","--theme-badge-error-bg":"rgba(165, 42, 42, 0.1)","--theme-badge-error-text":"#8B2222","--theme-badge-info-bg":"rgba(70, 130, 180, 0.1)","--theme-badge-info-text":"#3A6890"},
      "progress": {"--theme-progress-bg":"#DCD5C6","--theme-progress-primary":"#6B8E23","--theme-progress-success":"#556B2F"},
      "alerts": {"--theme-alert-info-bg":"rgba(70, 130, 180, 0.1)","--theme-alert-info-border":"#4682B4","--theme-alert-info-text":"#3A6890","--theme-alert-success-bg":"rgba(107, 142, 35, 0.1)","--theme-alert-success-border":"#6B8E23","--theme-alert-success-text":"#556B2F","--theme-alert-warning-bg":"rgba(184, 134, 11, 0.15)","--theme-alert-warning-border":"#B8860B","--theme-alert-warning-text":"#8B4513","--theme-alert-error-bg":"rgba(165, 42, 42, 0.1)","--theme-alert-error-border":"#A52A2A","--theme-alert-error-text":"#8B2222"},
      "modals": {"--theme-modal-overlay":"rgba(0, 0, 0, 0.5)","--theme-modal-content-bg":"#F4F2E9","--theme-modal-title":"#504A40","--theme-modal-body":"#7A7060"},
      "tabs": {"--theme-tab-button-text":"#7A7060","--theme-tab-button-active-text":"#6B8E23","--theme-tab-button-active-indicator":"#6B8E23"},
      "accordions": {"--theme-accordion-bg":"#EAE6DB","--theme-accordion-border":"#DCD5C6","--theme-accordion-title":"#504A40","--theme-accordion-icon":"#7A7060", "--theme-accordion-body-text": "#7A7060"},
      "tables": {"--theme-table-header-bg": "#F4F2E9", "--theme-table-cell-border": "#EAE6DB", "--theme-table-row-hover": "#F4F2E9"},
      "effects": {"--theme-shadow-soft":"0 2px 8px rgba(80, 74, 64, 0.08)","--theme-shadow-medium":"0 5px 15px rgba(80, 74, 64, 0.12)","--theme-shadow-strong":"0 10px 25px rgba(80, 74, 64, 0.15)"}
    },
    "dark": {
      "basic": {"--theme-body-bg":"#22272E","--theme-section-bg":"#2D333B","--theme-card-bg":"#373E47","--theme-text-primary":"#C9D1D9","--theme-text-secondary":"#8B949E","--theme-text-tertiary":"#6E7681","--theme-accent-primary":"#58A6FF","--theme-accent-secondary":"#6B8E23","--theme-border-light":"#373E47","--theme-border-medium":"#444C56"},
      "navigation": {"--theme-nav-brand":"#C9D1D9","--theme-nav-link":"#8B949E","--theme-nav-link-hover":"#58A6FF","--theme-nav-mobile-btn":"#C9D1D9","--theme-nav-bg":"rgba(34, 39, 46, 0.9)","--theme-nav-border":"rgba(255, 255, 255, 0.1)","--theme-nav-active":"#58A6FF"},
      "interactive": {"--theme-button-primary-bg":"#58A6FF","--theme-button-primary-hover":"#3B82F6","--theme-button-primary-text":"#22272E","--theme-button-secondary-bg":"#373E47","--theme-button-secondary-hover":"#444C56","--theme-button-secondary-text":"#C9D1D9","--theme-link-color":"#58A6FF","--theme-link-hover":"#6B8E23","--theme-input-bg":"#2D333B","--theme-input-border":"#444C56","--theme-input-focus":"#58A6FF","--theme-input-text":"#C9D1D9","--theme-input-placeholder":"#6E7681", "--theme-form-checkbox-accent": "#58A6FF", "--theme-form-radio-accent": "#58A6FF"},
      "cards": {"--theme-card-bg":"#373E47","--theme-card-border":"transparent","--theme-card-title":"#C9D1D9","--theme-card-subtitle":"#8B949E","--theme-card-icon":"#58A6FF","--theme-card-shadow":"0 4px 12px rgba(0, 0, 0, 0.3)"},
      "badges": {"--theme-badge-primary-bg":"rgba(88, 166, 255, 0.15)","--theme-badge-primary-text":"#82B1FF","--theme-badge-success-bg":"rgba(107, 142, 35, 0.15)","--theme-badge-success-text":"#BDB76B","--theme-badge-warning-bg":"rgba(210, 153, 34, 0.15)","--theme-badge-warning-text":"#DAA520","--theme-badge-error-bg":"rgba(218, 54, 51, 0.15)","--theme-badge-error-text":"#FA8072","--theme-badge-info-bg":"rgba(107, 142, 35, 0.15)","--theme-badge-info-text":"#BDB76B"},
      "progress": {"--theme-progress-bg":"#2D333B","--theme-progress-primary":"#58A6FF","--theme-progress-success":"#6B8E23"},
      "alerts": {"--theme-alert-info-bg":"rgba(88, 166, 255, 0.15)","--theme-alert-info-border":"#58A6FF","--theme-alert-info-text":"#82B1FF","--theme-alert-success-bg":"rgba(107, 142, 35, 0.15)","--theme-alert-success-border":"#6B8E23","--theme-alert-success-text":"#BDB76B","--theme-alert-warning-bg":"rgba(210, 153, 34, 0.15)","--theme-alert-warning-border":"#D29922","--theme-alert-warning-text":"#DAA520","--theme-alert-error-bg":"rgba(218, 54, 51, 0.15)","--theme-alert-error-border":"#DA3633","--theme-alert-error-text":"#FA8072"},
      "modals": {"--theme-modal-overlay":"rgba(0, 0, 0, 0.7)","--theme-modal-content-bg":"#2D333B","--theme-modal-title":"#C9D1D9","--theme-modal-body":"#8B949E"},
      "tabs": {"--theme-tab-button-text":"#8B949E","--theme-tab-button-active-text":"#58A6FF","--theme-tab-button-active-indicator":"#58A6FF"},
      "accordions": {"--theme-accordion-bg":"#2D333B","--theme-accordion-border":"#444C56","--theme-accordion-title":"#C9D1D9","--theme-accordion-icon":"#8B949E", "--theme-accordion-body-text": "#8B949E"},
      "tables": {"--theme-table-header-bg": "#2D333B", "--theme-table-cell-border": "#444C56", "--theme-table-row-hover": "#2D333B"},
      "effects": {"--theme-shadow-soft":"0 4px 12px rgba(0, 0, 0, 0.3)","--theme-shadow-medium":"0 8px 24px rgba(0, 0, 0, 0.5)","--theme-shadow-strong":"0 12px 32px rgba(0, 0, 0, 0.7)"}
    }
  },
  "spacing": {"--space-xs":"4px","--space-sm":"8px","--space-md":"16px","--space-lg":"24px","--space-xl":"32px","--space-2xl":"48px","--space-3xl":"64px"},
  "radius": {"--radius-sm":"4px","--radius-md":"8px","--radius-lg":"12px","--radius-xl":"16px","--radius-2xl":"24px","--radius-full":"9999px"}
};


// =================================================================
// Helper Components
// =================================================================
const Card = ({ children, className = '' }) => <div className={`bg-card-bg border border-border-medium rounded-lg shadow-sm transition-all duration-300 ${className}`}>{children}</div>;
const Button = ({ children, variant = 'primary', className = '', ...props }) => <button className={`px-4 py-2 rounded-md font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-body-bg focus:ring-accent-primary disabled:opacity-50 disabled:cursor-not-allowed ${variant === 'primary' ? 'btn-primary' : 'btn-secondary'} ${className}`} {...props}>{children}</button>;
const Alert = ({ children, variant = 'info', icon: Icon }) => <div className={`p-4 rounded-lg border flex items-start space-x-3 alert-${variant}-bg alert-${variant}-border alert-${variant}-text`}><Icon className="w-5 h-5 mt-0.5 flex-shrink-0" /><div>{children}</div></div>;
const AccordionItem = ({ title, children, isOpen, onClick }) => (
    <div className="accordion-border first:rounded-t-lg last:rounded-b-lg overflow-hidden">
        <button onClick={onClick} className="w-full p-4 text-left flex justify-between items-center accordion-header-hover transition-colors">
            <span className="font-semibold accordion-title">{title}</span>
            <ChevronDown className={`w-5 h-5 transition-transform duration-300 accordion-icon ${isOpen ? 'transform rotate-180' : ''}`} />
        </button>
        {isOpen && <div className="p-4 pt-0 accordion-body-text">{children}</div>}
    </div>
);
const Badge = ({ children, variant = 'primary' }) => <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full badge-${variant}-bg badge-${variant}-text`}>{children}</span>;


// =================================================================
// Main Components
// =================================================================
const ApiProviderSelector = ({ provider, setProvider }) => (
    <div className="flex bg-section-bg p-1 rounded-lg border border-border-medium">
        <button onClick={() => setProvider('gemini')} className={`w-1/2 py-2 text-sm font-bold rounded-md transition-colors ${provider === 'gemini' ? 'btn-primary' : 'text-secondary'}`}>
            <BrainCircuit className="w-4 h-4 mr-2 inline" />Gemini
        </button>
        <button onClick={() => setProvider('chatgpt')} className={`w-1/2 py-2 text-sm font-bold rounded-md transition-colors ${provider === 'chatgpt' ? 'btn-primary' : 'text-secondary'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-2 inline" viewBox="0 0 16 16"><path d="M8.001 0C3.582 0 0 3.582 0 8.001C0 12.418 3.582 16 8.001 16C12.418 16 16 12.418 16 8.001C16 3.582 12.418 0 8.001 0ZM5.333 4.667H10.667V6H8.667V11.333H7.333V6H5.333V4.667Z"/></svg>
            ChatGPT
        </button>
    </div>
);

const ApiKeyManager = ({ apiKey, setApiKey, provider }) => {
    const [localApiKey, setLocalApiKey] = useState(apiKey);
    const [isSaved, setIsSaved] = useState(false);
    const providerName = provider === 'gemini' ? 'Gemini' : 'ChatGPT';

    const handleSave = () => {
        setApiKey(localApiKey);
        localStorage.setItem(`${provider}ApiKey`, localApiKey);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    useEffect(() => { setLocalApiKey(apiKey); }, [apiKey, provider]);

    return (
        <Card className="p-4">
            <h3 className="text-lg font-bold text-primary mb-2 flex items-center"><KeyRound className="w-5 h-5 mr-2" />{providerName} API 키</h3>
            <div className="flex items-center space-x-2">
                <input type="password" value={localApiKey} onChange={(e) => setLocalApiKey(e.target.value)} placeholder={`${providerName} API 키를 입력하세요`} className="w-full p-2 input-bg input-border rounded-md focus:input-focus focus:outline-none transition-colors duration-300 text-primary placeholder-tertiary" />
                <Button onClick={handleSave} className="flex-shrink-0"><Save className="w-5 h-5" /></Button>
            </div>
            {isSaved && <p className="text-sm text-green-500 mt-2">API 키가 저장되었습니다.</p>}
            <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                <p className="text-xs text-tertiary flex items-center">
                    <Shield className="w-3 h-3 mr-1" />
                    API 키는 오직 본인의 브라우저에만 저장되며, 다른 사용자나 서버에 전송되지 않습니다.
                </p>
            </div>
            <p className="text-xs text-tertiary mt-2">각 기능 사용 시 예상 비용 정보는 미리보기 화면 하단 FAQ를 참고해주세요.</p>
        </Card>
    );
};


const InputArea = ({ onGenerate, isLoading }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  
  const handleSubmit = () => {
    onGenerate(text, image);
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview('');
    const fileInput = document.getElementById('image-input');
    if(fileInput) fileInput.value = '';
  }

  return (
    <div className="relative">
        {isLoading && (
            <div className="absolute inset-0 bg-section-bg/80 backdrop-blur-sm flex justify-center items-center z-20 rounded-lg">
                <div className="text-center">
                    <Loader className="w-12 h-12 animate-spin text-accent-primary mx-auto" />
                    <p className="mt-4 text-primary font-semibold">테마를 생성하고 있습니다...</p>
                </div>
            </div>
        )}
        <Card className="p-6">
          <div className="flex flex-col space-y-4">
            <h2 className="text-xl font-bold text-primary flex items-center"><Wand2 className="w-6 h-6 mr-2 text-accent-primary" />1. 영감 입력하기</h2>
            <p className="text-sm text-secondary">다음 3가지 방식 중 자유롭게 영감을 제공해주세요:</p>
            <div className="space-y-2">
              <label htmlFor="text-input" className="text-secondary font-semibold flex items-center"><Type className="w-4 h-4 mr-2" />1. 텍스트만으로 설명하기</label>
              <textarea id="text-input" value={text} onChange={(e) => setText(e.target.value)} placeholder="예: '안드레이 타르코프스키의 영화 거울'" className="w-full h-24 p-2 input-bg input-border rounded-md focus:input-focus focus:outline-none transition-colors duration-300 text-primary placeholder-tertiary" />
            </div>
            <div className="space-y-2">
              <label htmlFor="image-input" className="text-secondary font-semibold flex items-center"><ImageIcon className="w-4 h-4 mr-2" />2. 이미지만으로 영감주기</label>
              <input id="image-input" type="file" accept="image/*" onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];
                      const reader = new FileReader();
                      reader.onloadend = () => { setImage(reader.result.split(',')[1]); setImagePreview(reader.result); };
                      reader.readAsDataURL(file);
                  }
              }} className="hidden" />
              <Button onClick={() => document.getElementById('image-input').click()} variant="secondary" className="w-full">이미지 업로드</Button>
              {imagePreview && 
                <div className="relative mt-2 p-2 border border-dashed rounded-md border-medium">
                    <img src={imagePreview} alt="업로드 미리보기" className="max-h-32 w-auto rounded-md mx-auto" />
                    <button onClick={removeImage} className="absolute top-0 right-0 -mt-2 -mr-2 bg-card-bg rounded-full p-1 text-secondary hover:text-primary transition-colors">
                        <X className="w-4 h-4" />
                    </button>
                </div>
              }
            </div>
            <p className="text-sm text-secondary font-semibold">3. 텍스트와 이미지를 함께 사용하기 (가장 정교한 결과)</p>
            <Button onClick={handleSubmit} className="w-full flex items-center justify-center">나만의 테마 생성</Button>
          </div>
        </Card>
    </div>
  );
};

const ResultsArea = ({ analysis, theme, themeJson, onCopy, onDownload, onSuggestContent, isSuggestingContent, suggestedContent, onGenerateImage, isGeneratingImage, generatedImageUrl, onTweakTheme, isTweakingTheme, onCritique, isCritiquing, designCritique, onUpdateTheme, provider, onApplyBackground }) => {
    const [isCopied, setIsCopied] = useState(false);
    const [tweakInput, setTweakInput] = useState('');
    const handleCopy = () => { onCopy(); setIsCopied(true); setTimeout(() => setIsCopied(false), 2000); };
    
    const handleTweakSubmit = (e) => {
        e.preventDefault();
        if(!tweakInput) return;
        onTweakTheme(tweakInput);
        setTweakInput('');
    }

    const handleDownloadImage = () => {
        if (!generatedImageUrl) return;
        const link = document.createElement('a');
        link.href = generatedImageUrl;
        link.download = `generated-image-${new Date().getTime()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-4 pt-4">
            <Card className="p-4">
                <h3 className="text-lg font-bold text-primary mb-2 flex items-center"><BotMessageSquare className="w-5 h-5 mr-2" />AI의 디자인 제안 근거</h3>
                <p className="text-secondary text-sm whitespace-pre-wrap">{analysis}</p>
                <div className="grid grid-cols-2 gap-2 mt-4">
                    <Button onClick={onSuggestContent} disabled={isSuggestingContent} className="w-full flex items-center justify-center text-sm">
                        {isSuggestingContent ? <><Loader className="w-4 h-4 mr-2 animate-spin" /> 제안 중...</> : <><Sparkles className="w-4 h-4 mr-2" />콘텐츠 제안</>}
                    </Button>
                    <Button onClick={onGenerateImage} disabled={isGeneratingImage} className="w-full flex items-center justify-center text-sm px-2">
                        {isGeneratingImage 
                            ? <><Loader className="w-4 h-4 mr-2 animate-spin" /> 생성 중...</> 
                            : <div className="flex items-center justify-center">
                                  <ImagePlus className="w-5 h-5 mr-2" />
                                  <span className="font-semibold">({provider === 'gemini' ? 'Imagen 4' : 'gpt-image-1'})</span>
                              </div>
                        }
                    </Button>
                </div>
                {provider === 'gemini' && (
                    <Button onClick={onCritique} disabled={isCritiquing} className="w-full mt-2 flex items-center justify-center text-sm">
                        {isCritiquing ? <><Loader className="w-4 h-4 mr-2 animate-spin" /> 분석 중...</> : <><BrainCircuit className="w-4 h-4 mr-2" />AI 디자인 비평</>}
                    </Button>
                )}
            </Card>
            
            {generatedImageUrl && (
                <Card className="p-4">
                     <h3 className="text-lg font-bold text-primary mb-2">✨ AI 생성 이미지</h3>
                     <img src={generatedImageUrl} alt="AI generated" className="rounded-md w-full" />
                     <div className="grid grid-cols-2 gap-2 mt-2">
                        <Button onClick={() => onApplyBackground(generatedImageUrl)} variant="secondary" className="w-full text-sm"><ImageIcon className="w-4 h-4 mr-2 inline" />배경으로 적용</Button>
                        <Button onClick={handleDownloadImage} variant="secondary" className="w-full text-sm"><Download className="w-4 h-4 mr-2 inline" />다운로드</Button>
                     </div>
                </Card>
            )}
            {suggestedContent && (
                <Card className="p-4">
                    <h3 className="text-lg font-bold text-primary mb-2">✨ AI 콘텐츠 제안</h3>
                    <div className="space-y-3 text-sm">
                        <div><strong className="text-secondary block">웹사이트 제목:</strong><p className="text-primary">{suggestedContent.title}</p></div>
                        <div><strong className="text-secondary block">핵심 슬로건:</strong><p className="text-primary">{suggestedContent.tagline}</p></div>
                        <div><strong className="text-secondary block">소개 문구 (About):</strong><p className="text-primary whitespace-pre-wrap">{suggestedContent.about}</p></div>
                    </div>
                </Card>
            )}
            {designCritique && (
                 <Card className="p-4">
                    <h3 className="text-lg font-bold text-primary mb-2">✨ AI 디자인 비평</h3>
                    {typeof designCritique.critique === 'string' ? (
                        <p className="text-secondary text-sm whitespace-pre-wrap mb-3">{designCritique.critique}</p>
                    ) : (
                        <div className="text-secondary text-sm space-y-2 mb-3">
                            {Object.entries(designCritique.critique).map(([key, value]) => (
                                <div key={key}>
                                    <strong className="text-primary capitalize">{key.replace(/([A-Z])/g, ' $1')}:</strong> {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                                </div>
                            ))}
                        </div>
                    )}

                    <h4 className="text-sm font-bold text-primary mb-2">수정 제안:</h4>
                     <div className="flex flex-col space-y-2">
                        {designCritique.suggestions.map((s, i) => {
                            const suggestionText = typeof s === 'string' ? s : (s && s.prompt ? String(s.prompt) : JSON.stringify(s));
                            const rationaleText = typeof s === 'object' && s.rationale ? String(s.rationale) : null;
                            return (
                                <button key={i} onClick={() => setTweakInput(suggestionText)} className="text-left text-sm p-2 rounded-md bg-gray-500/10 hover:bg-gray-500/20 text-accent-primary">
                                    "{suggestionText}"
                                    {rationaleText && <span className="block text-xs text-tertiary mt-1">{rationaleText}</span>}
                                </button>
                            );
                        })}
                    </div>
                </Card>
            )}
            <Card className="p-4">
                <h3 className="text-lg font-bold text-primary mb-2">AI로 테마 미세조정</h3>
                <form onSubmit={handleTweakSubmit} className="space-y-2">
                    <textarea id="tweak-textarea" value={tweakInput} onChange={(e) => setTweakInput(e.target.value)} placeholder="예: 좀 더 밝고 활기찬 느낌으로 바꿔줘" className="w-full h-20 p-2 input-bg input-border rounded-md focus:input-focus focus:outline-none transition-colors duration-300 text-primary placeholder-tertiary" disabled={isTweakingTheme} />
                    <Button type="submit" disabled={isTweakingTheme} className="w-full flex items-center justify-center text-sm">
                        {isTweakingTheme ? <><Loader className="w-4 h-4 mr-2 animate-spin" /> 조정 중...</> : <>테마 조정 요청</>}
                    </Button>
                </form>
            </Card>
            <Card className="p-4">
                <h3 className="text-lg font-bold text-primary mb-2">생성된 테마 JSON</h3>
                <pre className="w-full p-3 rounded-md text-xs bg-gray-500/10 text-tertiary overflow-x-auto h-64"><code>{themeJson}</code></pre>
                <div className="flex space-x-2 mt-2">
                    <Button onClick={handleCopy} variant="secondary" className="w-full text-sm"><Copy className="w-4 h-4 mr-2 inline" />{isCopied ? '복사 완료!' : '복사하기'}</Button>
                    <Button onClick={onDownload} variant="secondary" className="w-full text-sm"><Download className="w-4 h-4 mr-2 inline" />다운로드</Button>
                </div>
            </Card>
        </div>
    );
};

const PreviewArea = ({ theme, mode, setMode, appliedBackground }) => {
  const displayName = theme?.displayName || "테마 이름";
  const [activeTab, setActiveTab] = useState('profile');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState('desktop');

  const viewportClasses = { desktop: 'w-full', tablet: 'max-w-3xl mx-auto', mobile: 'max-w-sm mx-auto' };
  const DeviceButton = ({ device, label, icon: Icon }) => (
    <button onClick={() => setViewMode(device)} className={`p-2 rounded-md flex items-center space-x-2 transition-colors ${viewMode === device ? 'btn-primary' : 'btn-secondary'}`}>
        <Icon className="w-5 h-5"/><span className="hidden sm:inline">{label}</span>
    </button>
  );

  const faqData = [
    {
        q: "API 사용 시 예상 비용은 얼마인가요? (텍스트 및 이미지)",
        a: "API 사용 시 비용이 발생하며, 사용량은 '토큰(Token)'이라는 단위로 계산됩니다. 토큰은 대략 단어나 글자 수와 비례합니다.\n\n텍스트 생성 비용 (Gemini & ChatGPT):\n- 개념: AI가 요청을 이해하고(입력 토큰) 답변을 생성하는(출력 토큰) 양에 따라 비용이 책정됩니다. 저희 앱은 테마 생성을 위해 복잡한 요청을 보내므로, 한 번의 '테마 생성' 요청에 약 10,000 ~ 15,000 토큰이 소모될 수 있습니다.\n- Gemini (gemini-2.5-flash 기준): 1백만 토큰당 입력 $0.3, 출력 $2.5입니다. '테마 생성' 1회에 약 50원 ~ 60원의 비용이 발생할 수 있습니다.\n- ChatGPT (gpt-4.1-mini 기준): 1백만 토큰당 입력 $0.4, 출력 $1.60로 매우 저렴합니다. '테마 생성' 1회에 약 20원 ~ 30원의 비용이 발생할 수 있습니다.\n\n이미지 생성 비용:\n- Gemini (Imagen 4 기준): 이미지 1장 생성에 약 $0.04 (한화 약 55원) 입니다.\n- ChatGPT (gpt-image-1 기준): 이미지 1장 생성에 약 $0.04 (한화 약 55원) 입니다.\n\n※ 중요: 위 비용은 2025년 7월 기준 대략적인 추정치이며, 실제 비용은 API 제공사의 정책, 모델 버전, 요청의 복잡도에 따라 변동될 수 있습니다. 정확한 정보는 각 API의 공식 가격 정책 페이지를 반드시 참고해 주시기 바랍니다."
    },
    {
        q: "Imagen API는 별도의 API가 필요한가요?",
        a: "아니요, Imagen API는 별도의 API가 아닙니다. Gemini API 키에 포함된 기능 중 하나입니다. 다만, Google의 정책상 고품질 이미지 생성 기능인 Imagen API를 사용하려면, 해당 API 키가 유료 결제가 활성화된 Google Cloud 프로젝트에 연결되어 있어야 합니다."
    }
  ];

  return (
    <div className="w-full h-full flex flex-col bg-body-bg" style={appliedBackground ? { backgroundImage: `url(${appliedBackground})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' } : {}}>
        <div className={`flex-grow overflow-y-auto transition-all duration-500 ease-in-out ${viewportClasses[viewMode]}`}>
            <header className="nav-bg shadow-md sticky top-0 z-10 backdrop-blur-sm">
                <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                    <div className="text-xl font-bold nav-brand title-font">{displayName}</div>
                    <nav className={`${viewMode === 'desktop' ? 'flex' : 'hidden'} space-x-4`}><a href="#" className="nav-link-active font-semibold">Home</a><a href="#" className="nav-link">About</a><a href="#" className="nav-link">Portfolio</a><a href="#" className="nav-link">Contact</a></nav>
                    <Button variant="primary" className={`${viewMode === 'desktop' ? 'block' : 'hidden'}`}>Get Started</Button>
                    <button className={`${viewMode !== 'desktop' ? 'block' : 'hidden'} nav-mobile-btn`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>}
                    </button>
                </div>
                {isMobileMenuOpen && viewMode !== 'desktop' && (
                    <div className="nav-bg border-t nav-border"><nav className="flex flex-col p-4 space-y-2"><a href="#" className="nav-link-active font-semibold block px-3 py-2 rounded-md">Home</a><a href="#" className="nav-link block px-3 py-2 rounded-md">About</a><a href="#" className="nav-link block px-3 py-2 rounded-md">Portfolio</a><a href="#" className="nav-link block px-3 py-2 rounded-md">Contact</a></nav></div>
                )}
            </header>
            <div className="p-6 space-y-6">
                <h2 className="text-3xl font-bold title-font text-primary transition-colors duration-300" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.3)'}}>"{displayName}" 테마로 적용되었습니다.</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="p-4 space-y-3">
                        <h3 className="card-title-font text-lg font-bold card-title">상호작용 요소</h3>
                        <div className="flex flex-wrap gap-2"><Button variant="primary">Primary</Button><Button variant="secondary" onClick={() => setIsModalOpen(true)}>Open Modal</Button></div>
                        <input type="text" placeholder="입력창 예시" className="w-full p-2 input-bg input-border rounded-md focus:input-focus focus:outline-none transition-colors duration-300 text-primary placeholder-tertiary" />
                        <a href="#" className="link-color hover:link-hover font-semibold">이것은 링크입니다.</a>
                    </Card>
                    <Card className="p-4 space-y-3">
                        <h3 className="card-title-font text-lg font-bold card-title">폼 요소</h3>
                        <div className="space-y-2 text-secondary"><label className="flex items-center"><input type="checkbox" className="form-checkbox rounded-sm" defaultChecked /> 이메일 알림 받기</label><label className="flex items-center"><input type="checkbox" className="form-checkbox rounded-sm" /> SMS 알림 받기</label></div>
                        <div className="space-y-2 text-secondary"><label className="flex items-center"><input type="radio" name="radio-group" className="form-radio" defaultChecked /> 기본 옵션</label><label className="flex items-center"><input type="radio" name="radio-group" className="form-radio" /> 고급 옵션</label></div>
                    </Card>
                    <div className="md:col-span-2">
                        <Card>
                            <div className="flex border-b border-border-medium">
                                <button onClick={() => setActiveTab('profile')} className={`tab-button ${activeTab === 'profile' ? 'tab-active' : ''}`}><MessageSquare className="w-4 h-4 mr-2"/>프로필</button>
                                <button onClick={() => setActiveTab('settings')} className={`tab-button ${activeTab === 'settings' ? 'tab-active' : ''}`}><SlidersHorizontal className="w-4 h-4 mr-2"/>설정</button>
                                <button onClick={() => setActiveTab('security')} className={`tab-button ${activeTab === 'security' ? 'tab-active' : ''}`}><Shield className="w-4 h-4 mr-2"/>보안</button>
                            </div>
                            <div className="p-4">{activeTab === 'profile' && <p className="text-secondary">프로필 정보가 여기에 표시됩니다.</p>}{activeTab === 'settings' && <p className="text-secondary">계정 설정이 여기에 표시됩니다.</p>}{activeTab === 'security' && <p className="text-secondary">보안 설정이 여기에 표시됩니다.</p>}</div>
                        </Card>
                    </div>
                    <div className="md:col-span-2">
                        <h3 className="text-xl font-bold title-font text-primary mb-2">뱃지(Badges)</h3>
                        <Card className="p-4 flex flex-wrap gap-2">
                            <Badge variant="primary">Primary</Badge>
                            <Badge variant="success">Success</Badge>
                            <Badge variant="warning">Warning</Badge>
                            <Badge variant="error">Error</Badge>
                            <Badge variant="info">Info</Badge>
                        </Card>
                    </div>
                    <div className="md:col-span-2">
                        <h3 className="text-xl font-bold title-font text-primary mb-2">프로그래시브 바 & 상태 표시</h3>
                        <Card className="p-4 space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-secondary">프로젝트 진행률</span>
                                    <span className="text-sm font-medium text-primary">75%</span>
                                </div>
                                <div className="w-full rounded-full h-2" style={{backgroundColor: 'var(--theme-border-light)'}}>
                                    <div className="btn-primary h-2 rounded-full transition-all duration-300" style={{width: '75%'}}></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-secondary">스토리지 사용량</span>
                                    <span className="text-sm font-medium text-primary">4.2GB / 10GB</span>
                                </div>
                                <div className="w-full rounded-full h-2" style={{backgroundColor: 'var(--theme-border-light)'}}>
                                    <div className="h-2 rounded-full transition-all duration-300" style={{width: '42%', backgroundColor: 'var(--theme-accent-secondary)'}}></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-secondary">다운로드 진행률</span>
                                    <span className="text-sm font-medium text-primary">완료</span>
                                </div>
                                <div className="w-full rounded-full h-2" style={{backgroundColor: 'var(--theme-border-light)'}}>
                                    <div className="h-2 rounded-full transition-all duration-300" style={{width: '100%', backgroundColor: 'var(--theme-badge-success-text)'}}></div>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className="md:col-span-2">
                        <h3 className="text-xl font-bold title-font text-primary mb-2">알림(Alerts)</h3>
                        <div className="space-y-4">
                            <Alert variant="info" icon={Info}>정보 알림입니다. 추가 정보를 확인하세요.</Alert>
                            <Alert variant="success" icon={CheckCircle}>성공 알림입니다. 작업이 완료되었습니다.</Alert>
                            <Alert variant="warning" icon={AlertTriangle}>경고 알림입니다. 주의가 필요합니다.</Alert>
                            <Alert variant="error" icon={ServerCrash}>오류 알림입니다. 문제가 발생했습니다.</Alert>
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <h3 className="text-xl font-bold title-font text-primary mb-2">카드 갤러리</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <Card className="overflow-hidden">
                                <div className="h-32 bg-gradient-to-br from-blue-500 to-purple-600"></div>
                                <div className="p-4">
                                    <h4 className="font-bold text-primary mb-2">프로젝트 A</h4>
                                    <p className="text-sm text-secondary">웹 애플리케이션 개발 프로젝트입니다.</p>
                                    <div className="mt-3 flex items-center justify-between">
                                        <Badge variant="primary">진행중</Badge>
                                        <span className="text-xs text-tertiary">2024.01.15</span>
                                    </div>
                                </div>
                            </Card>
                            <Card className="overflow-hidden">
                                <div className="h-32 bg-gradient-to-br from-green-500 to-teal-600"></div>
                                <div className="p-4">
                                    <h4 className="font-bold text-primary mb-2">프로젝트 B</h4>
                                    <p className="text-sm text-secondary">모바일 앱 디자인 프로젝트입니다.</p>
                                    <div className="mt-3 flex items-center justify-between">
                                        <Badge variant="success">완료</Badge>
                                        <span className="text-xs text-tertiary">2024.01.10</span>
                                    </div>
                                </div>
                            </Card>
                            <Card className="overflow-hidden">
                                <div className="h-32 bg-gradient-to-br from-orange-500 to-red-600"></div>
                                <div className="p-4">
                                    <h4 className="font-bold text-primary mb-2">프로젝트 C</h4>
                                    <p className="text-sm text-secondary">브랜딩 및 로고 디자인 프로젝트입니다.</p>
                                    <div className="mt-3 flex items-center justify-between">
                                        <Badge variant="warning">검토중</Badge>
                                        <span className="text-xs text-tertiary">2024.01.20</span>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <h3 className="text-xl font-bold title-font text-primary mb-2">통계 대시보드</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Card className="p-4 text-center">
                                <div className="text-2xl font-bold text-primary">1,234</div>
                                <div className="text-sm text-secondary mt-1">총 방문자</div>
                                <div className="text-xs text-green-500 mt-1">↗ +12%</div>
                            </Card>
                            <Card className="p-4 text-center">
                                <div className="text-2xl font-bold text-primary">89</div>
                                <div className="text-sm text-secondary mt-1">완료된 프로젝트</div>
                                <div className="text-xs text-blue-500 mt-1">↗ +5%</div>
                            </Card>
                            <Card className="p-4 text-center">
                                <div className="text-2xl font-bold text-primary">4.8</div>
                                <div className="text-sm text-secondary mt-1">평균 평점</div>
                                <div className="text-xs text-yellow-500 mt-1">★★★★★</div>
                            </Card>
                            <Card className="p-4 text-center">
                                <div className="text-2xl font-bold text-primary">₩2.1M</div>
                                <div className="text-sm text-secondary mt-1">총 수익</div>
                                <div className="text-xs text-green-500 mt-1">↗ +18%</div>
                            </Card>
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <h3 className="text-xl font-bold title-font text-primary mb-2">데이터 테이블</h3>
                        <Card className="overflow-hidden">
                            <table className="w-full">
                                <thead className="table-header-bg">
                                    <tr>
                                        <th className="text-left p-3 font-semibold text-primary">이름</th>
                                        <th className="text-left p-3 font-semibold text-primary">상태</th>
                                        <th className="text-left p-3 font-semibold text-primary">날짜</th>
                                        <th className="text-left p-3 font-semibold text-primary">액션</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="table-row-hover cursor-pointer">
                                        <td className="p-3 text-primary table-cell-border">김민수</td>
                                        <td className="p-3 table-cell-border"><Badge variant="success">활성</Badge></td>
                                        <td className="p-3 text-secondary table-cell-border">2024.01.15</td>
                                        <td className="p-3 table-cell-border"><Button variant="secondary" className="py-1 px-2 text-xs">편집</Button></td>
                                    </tr>
                                    <tr className="table-row-hover cursor-pointer">
                                        <td className="p-3 text-primary table-cell-border">박영희</td>
                                        <td className="p-3 table-cell-border"><Badge variant="warning">대기</Badge></td>
                                        <td className="p-3 text-secondary table-cell-border">2024.01.14</td>
                                        <td className="p-3 table-cell-border"><Button variant="secondary" className="py-1 px-2 text-xs">편집</Button></td>
                                    </tr>
                                    <tr className="table-row-hover cursor-pointer">
                                        <td className="p-3 text-primary table-cell-border">이철수</td>
                                        <td className="p-3 table-cell-border"><Badge variant="error">비활성</Badge></td>
                                        <td className="p-3 text-secondary table-cell-border">2024.01.13</td>
                                        <td className="p-3 table-cell-border"><Button variant="secondary" className="py-1 px-2 text-xs">편집</Button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </Card>
                    </div>
                    <div className="md:col-span-2">
                        <h3 className="text-xl font-bold title-font text-primary mb-2">타임라인</h3>
                        <Card className="p-4">
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <div className="w-3 h-3 rounded-full mt-1.5" style={{backgroundColor: 'var(--theme-accent-primary)'}}></div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-semibold text-primary">프로젝트 시작</h4>
                                            <span className="text-xs text-tertiary">2024.01.01</span>
                                        </div>
                                        <p className="text-sm text-secondary mt-1">새로운 웹 애플리케이션 개발 프로젝트가 시작되었습니다.</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-3 h-3 rounded-full mt-1.5" style={{backgroundColor: 'var(--theme-accent-secondary)'}}></div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-semibold text-primary">디자인 완료</h4>
                                            <span className="text-xs text-tertiary">2024.01.10</span>
                                        </div>
                                        <p className="text-sm text-secondary mt-1">UI/UX 디자인 작업이 완료되었습니다.</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-3 h-3 rounded-full mt-1.5" style={{backgroundColor: 'var(--theme-badge-success-text)'}}></div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-semibold text-primary">개발 완료</h4>
                                            <span className="text-xs text-tertiary">2024.01.20</span>
                                        </div>
                                        <p className="text-sm text-secondary mt-1">프론트엔드 개발이 완료되었습니다.</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className="md:col-span-2">
                        <h3 className="text-xl font-bold title-font text-primary mb-2">댓글 시스템</h3>
                        <Card className="p-4">
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">김</div>
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2">
                                            <span className="font-semibold text-primary">김민수</span>
                                            <span className="text-xs text-tertiary">2시간 전</span>
                                        </div>
                                        <p className="text-sm text-secondary mt-1">정말 좋은 프로젝트네요! 디자인이 깔끔하고 사용자 경험이 훌륭합니다.</p>
                                        <div className="flex items-center space-x-3 mt-2">
                                            <button className="text-xs text-tertiary hover:text-primary">좋아요</button>
                                            <button className="text-xs text-tertiary hover:text-primary">답글</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white font-bold">박</div>
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2">
                                            <span className="font-semibold text-primary">박영희</span>
                                            <span className="text-xs text-tertiary">1일 전</span>
                                        </div>
                                        <p className="text-sm text-secondary mt-1">기능이 매우 직관적이고 사용하기 편리합니다. 개발자분께 감사드립니다.</p>
                                        <div className="flex items-center space-x-3 mt-2">
                                            <button className="text-xs text-tertiary hover:text-primary">좋아요</button>
                                            <button className="text-xs text-tertiary hover:text-primary">답글</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold">이</div>
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2">
                                            <span className="font-semibold text-primary">이철수</span>
                                            <span className="text-xs text-tertiary">3일 전</span>
                                        </div>
                                        <p className="text-sm text-secondary mt-1">다음 업데이트가 기대됩니다. 새로운 기능들이 추가되면 알려주세요!</p>
                                        <div className="flex items-center space-x-3 mt-2">
                                            <button className="text-xs text-tertiary hover:text-primary">좋아요</button>
                                            <button className="text-xs text-tertiary hover:text-primary">답글</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className="md:col-span-2">
                        <h3 className="text-xl font-bold title-font text-primary mb-2">효과(Effects)</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="p-6 rounded-lg bg-card-bg" style={{boxShadow: 'var(--theme-shadow-soft)'}}>Soft Shadow</div>
                            <div className="p-6 rounded-lg bg-card-bg" style={{boxShadow: 'var(--theme-shadow-medium)'}}>Medium Shadow</div>
                            <div className="p-6 rounded-lg bg-card-bg" style={{boxShadow: 'var(--theme-shadow-strong)'}}>Strong Shadow</div>
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <h3 className="text-xl font-bold title-font text-primary mb-2">로딩(Loading)</h3>
                        <Card className="p-4 space-y-4">
                            <div className="flex items-center space-x-4">
                                <Loader className="w-8 h-8 animate-spin text-accent-primary" />
                                <p className="text-secondary">데이터를 불러오는 중...</p>
                            </div>
                            <div className="space-y-3 animate-pulse">
                                <div className="h-4 bg-section-bg rounded w-3/4"></div>
                                <div className="h-4 bg-section-bg rounded"></div>
                                <div className="h-4 bg-section-bg rounded w-5/6"></div>
                            </div>
                        </Card>
                    </div>
                    <div className="md:col-span-2">
                        <Card className="p-4">
                            <h3 className="card-title-font text-lg font-bold card-title mb-3">테이블</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead><tr className="table-header-bg"><th className="p-3">ID</th><th className="p-3">이름</th><th className="p-3">역할</th></tr></thead>
                                    <tbody>
                                        <tr className="table-row-hover"><td className="p-3 table-cell-border">1</td><td className="p-3 table-cell-border">Andrei</td><td className="p-3 table-cell-border">Director</td></tr>
                                        <tr className="table-row-hover"><td className="p-3 table-cell-border">2</td><td className="p-3 table-cell-border">Solaris</td><td className="p-3 table-cell-border">Planet</td></tr>
                                        <tr className="table-row-hover"><td className="p-3 table-cell-border">3</td><td className="p-3 table-cell-border">Stalker</td><td className="p-3 table-cell-border">Guide</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>
                    <div className="md:col-span-2">
                        <h3 className="text-xl font-bold title-font text-primary mb-2">자주 묻는 질문 (FAQ)</h3>
                        <div className="accordion-bg rounded-lg">
                            {faqData.map((item, index) => (
                                <AccordionItem key={index} title={item.q} isOpen={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                                    <p className="whitespace-pre-wrap text-sm">{item.a}</p>
                                </AccordionItem>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="sticky bottom-0 left-0 right-0 p-4 border-t border-border-light bg-section-bg flex justify-center items-center space-x-2 z-10">
            <DeviceButton device="mobile" label="Mobile" icon={Smartphone} /><DeviceButton device="tablet" label="Tablet" icon={Tablet} /><DeviceButton device="desktop" label="Desktop" icon={Monitor} />
            <div className="border-l border-border-medium h-8 mx-2"></div>
            <button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')} className="p-2 rounded-md btn-secondary" aria-label="Toggle light/dark mode">{mode === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}</button>
        </div>
        {isModalOpen && (<div className="fixed inset-0 z-50 flex items-center justify-center modal-overlay"><div className="p-6 w-full max-w-md modal-content-bg rounded-lg shadow-lg"><h3 className="text-xl font-bold modal-title mb-4">모달 창</h3><p className="modal-body mb-6">이것은 모달 창의 내용입니다. 테마에 따라 스타일이 변경됩니다.</p><Button onClick={() => setIsModalOpen(false)} className="w-full">닫기</Button></div></div>)}
    </div>
  );
};

export default function App() {
  const [theme, setTheme] = useState(initialTheme);
  const [analysis, setAnalysis] = useState(initialTheme.analysis);
  const [mode, setMode] = useState('dark');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiProvider, setApiProvider] = useState('gemini');
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [chatGptApiKey, setChatGptApiKey] = useState('');
  const [suggestedContent, setSuggestedContent] = useState(null);
  const [isSuggestingContent, setIsSuggestingContent] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isTweakingTheme, setIsTweakingTheme] = useState(false);
  const [designCritique, setDesignCritique] = useState(null);
  const [isCritiquing, setIsCritiquing] = useState(false);
  const [appliedBackground, setAppliedBackground] = useState(null);

  useEffect(() => {
    const savedGeminiKey = localStorage.getItem('geminiApiKey');
    if (savedGeminiKey) setGeminiApiKey(savedGeminiKey);
    const savedChatGptKey = localStorage.getItem('chatgptApiKey');
    if (savedChatGptKey) setChatGptApiKey(savedChatGptKey);
  }, []);
  
  const activeApiKey = useMemo(() => apiProvider === 'gemini' ? geminiApiKey : chatGptApiKey, [apiProvider, geminiApiKey, chatGptApiKey]);

  const applyTheme = useCallback((themeData, currentMode) => {
    try {
        if (!themeData || !themeData.font) return;
        const root = document.documentElement;

        if (typeof themeData.font.title === 'string' && typeof themeData.font.primary === 'string') {
            const titleFont = themeData.font.title.split(',')[0].trim().replace(/"/g, '');
            const primaryFont = themeData.font.primary.split(',')[0].trim().replace(/"/g, '');
            const existingLink = document.querySelector(`link[href*="${titleFont.replace(/ /g, '+')}"]`);
            if (!existingLink) {
                const link = document.createElement('link');
                link.href = `https://fonts.googleapis.com/css2?family=${titleFont.replace(/ /g, '+')}:wght@400;700&family=${primaryFont.replace(/ /g, '+')}:wght@400;700&display=swap`;
                link.rel = 'stylesheet';
                document.head.appendChild(link);
            }
            
            root.style.setProperty('--font-primary', themeData.font.primary); 
            root.style.setProperty('--font-title', themeData.font.title); 
        }
        if (themeData.spacing) { Object.entries(themeData.spacing).forEach(([key, value]) => root.style.setProperty(key, value)); }
        if (themeData.radius) { Object.entries(themeData.radius).forEach(([key, value]) => root.style.setProperty(key, value)); }
        if (themeData.colors && themeData.colors[currentMode]) {
            const colors = themeData.colors[currentMode];
            Object.values(colors).forEach(category => {
                if (typeof category === 'object' && category !== null) {
                    Object.entries(category).forEach(([key, value]) => { if (typeof key === 'string' && key.startsWith('--theme-')) { root.style.setProperty(key, value); } });
                }
            });
        }
    } catch (e) { console.error("테마 적용 중 오류 발생:", e); setError("테마를 적용하는 데 실패했습니다."); }
  }, []);
  useEffect(() => { applyTheme(theme, mode); }, [theme, mode, applyTheme]);

  // Function to extract JSON from a string
  const extractJson = (text) => {
    try {
        const match = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
        if (match) {
            return JSON.parse(match[0]);
        }
        throw new Error("응답에서 JSON 객체를 찾을 수 없습니다.");
    } catch (e) {
        console.error("JSON 파싱 오류:", e, "원본 텍스트:", text);
        throw new Error("AI의 응답에서 JSON을 파싱하는데 실패했습니다.");
    }
  };

  const generateWithGemini = async (apiKey, payload) => {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: payload }) });
    if (!response.ok) { const errorBody = await response.text(); throw new Error(`API 오류: ${response.status} ${response.statusText} - ${errorBody}`); }
    const result = await response.json();
    if (result.candidates && result.candidates.length > 0 && result.candidates[0].content.parts[0].text) { 
        return result.candidates[0].content.parts[0].text; 
    }
    throw new Error("API로부터 유효한 응답을 받지 못했습니다.");
  };

  const generateWithChatGPT = async (apiKey, payload) => {
    const apiUrl = 'https://api.openai.com/v1/chat/completions';
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify({ model: "gpt-4.1-mini", messages: payload })
    });
    if (!response.ok) { const errorBody = await response.text(); throw new Error(`API 오류: ${response.status} ${response.statusText} - ${errorBody}`); }
    const result = await response.json();
    if (result.choices && result.choices.length > 0) { 
        return result.choices[0].message.content; 
    }
    throw new Error("API로부터 유효한 응답을 받지 못했습니다.");
  };
  
  const generateImageWithImagen = async (apiKey, prompt) => {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-preview-06-06:predict?key=${apiKey}`;
    const payload = { instances: [{ prompt }], parameters: { "sampleCount": 1 } };
    const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (!response.ok) { const errorBody = await response.text(); throw new Error(`API 오류: ${response.status} ${response.statusText} - ${errorBody}`); }
    const result = await response.json();
    if (result.predictions && result.predictions.length > 0 && result.predictions[0].bytesBase64Encoded) {
        return `data:image/png;base64,${result.predictions[0].bytesBase64Encoded}`;
    }
    throw new Error("이미지 생성 API로부터 유효한 응답을 받지 못했습니다.");
  };

  const generateImageWithDalle = async (apiKey, prompt) => {
    const apiUrl = 'https://api.openai.com/v1/images/generations';
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({ model: "gpt-image-1", prompt: prompt, n: 1, size: "1024x1024" })
    });
    if (!response.ok) { const errorBody = await response.text(); throw new Error(`DALL-E API 오류: ${response.status} ${response.statusText} - ${errorBody}`); }
    const result = await response.json();
    if (result.data && result.data.length > 0 && result.data[0].b64_json) {
      return `data:image/png;base64,${result.data[0].b64_json}`;
    }
    throw new Error("DALL-E API로부터 유효한 이미지 데이터를 받지 못했습니다.");
  };

  const handleApiCall = async (action, setLoading, apiKey) => {
    if (!apiKey) {
        setError(`${apiProvider === 'gemini' ? 'Gemini' : 'ChatGPT'} API 키를 먼저 입력하고 저장해주세요.`);
        return;
    }
    setLoading(true);
    setError(null);
    try {
        await action();
    } catch (err) {
        console.error("API 호출 오류:", err);
        setError(err.message);
    } finally {
        setLoading(false);
    }
  };
  
  const handleGenerateTheme = (text, imageBase64) => handleApiCall(async () => {
    setAnalysis(null); setSuggestedContent(null); setGeneratedImageUrl(null); setDesignCritique(null); setAppliedBackground(null);
    
    const systemPrompt = `당신은 세계 최고의 디자이너 '미리내맨 테마 생성기'입니다. 사용자의 요청을 분석하여, 제공된 초기 테마 JSON의 전체 구조와 변수 개수를 완벽하게 유지하면서, 요청에 맞게 값만 수정한 새로운 테마 JSON을 반환하세요. 'analysis' 필드에는 당신의 디자인 결정에 대한 이유를 한국어로 상세히 설명해야 합니다. Your output MUST be a valid JSON object and nothing else. Do not include any text before or after the JSON object. Do not use markdown backticks.`;
    
    let newThemeText;
    if (apiProvider === 'gemini') {
      const payload = [{ role: "user", parts: [{ text: systemPrompt }, { text: `사용자 요청: "${text}"` }, ...(imageBase64 ? [{inlineData: { mimeType: "image/png", data: imageBase64 }}] : []), {text: `\n\n반드시 이 JSON 구조를 따라야 합니다:\n${JSON.stringify(initialTheme, null, 2)}`}] }];
      newThemeText = await generateWithGemini(activeApiKey, payload);
    } else { // ChatGPT
      const payload = [
          { role: "system", content: systemPrompt },
          { role: "user", content: `사용자 요청: "${text}".\n\n반드시 이 JSON 구조를 따라야 합니다:\n${JSON.stringify(initialTheme, null, 2)}` }
      ];
      newThemeText = await generateWithChatGPT(activeApiKey, payload);
    }

    const newTheme = extractJson(newThemeText);
    if (!newTheme.analysis || !newTheme.colors) throw new Error("AI로부터 유효한 테마 구조를 받지 못했습니다.");
    
    setAnalysis(newTheme.analysis);
    setTheme(newTheme);
  }, setIsLoading, activeApiKey);

  const handleSuggestContent = () => handleApiCall(async () => {
    const systemPrompt = `당신은 전문 웹 콘텐츠 전략가입니다. 주어진 테마 분석 내용을 바탕으로, 해당 테마에 가장 잘 어울리는 웹사이트 제목(title), 핵심 슬로건(tagline), 그리고 'About' 페이지 소개 문구(about)를 제안해주세요. 모든 결과는 반드시 한국어로 작성되어야 합니다. Your output MUST be a valid JSON object.`;
    let contentText;
    if (apiProvider === 'gemini') {
        const payload = [{ role: "user", parts: [{ text: systemPrompt }, {text: `테마 분석: "${analysis}"`}] }];
        contentText = await generateWithGemini(activeApiKey, payload);
    } else {
        const payload = [{ role: "system", content: systemPrompt }, { role: "user", content: `테마 분석: "${analysis}"` }];
        contentText = await generateWithChatGPT(activeApiKey, payload);
    }
    setSuggestedContent(extractJson(contentText));
  }, setIsSuggestingContent, activeApiKey);

  const handleGenerateImage = () => handleApiCall(async () => {
    let prompt = `다음 테마 분석에 어울리는 추상적이고 미적인 배경 이미지를 생성해줘. IMPORTANT: Do not include any people or identifiable figures. Focus on colors, textures, and mood. Theme analysis: "${analysis}"`;
    
    let imageUrl;
    if (apiProvider === 'gemini') {
        try {
            imageUrl = await generateImageWithImagen(geminiApiKey, prompt);
        } catch(err) {
            if (err.message.includes("billed users")) {
                throw new Error("이미지 생성 실패: 사용 중인 Gemini API 키는 이미지 생성(Imagen) API 사용 권한이 없습니다. Google Cloud에서 결제 계정이 활성화된 프로젝트의 API 키를 사용해주세요.");
            }
            throw err;
        }
    } else { // ChatGPT (DALL-E)
        imageUrl = await generateImageWithDalle(chatGptApiKey, prompt);
    }
    setGeneratedImageUrl(imageUrl);
  }, setIsGeneratingImage, activeApiKey);

  const handleTweakTheme = (tweakRequest) => handleApiCall(async () => {
    const systemPrompt = `당신은 웹 디자인 AI 어시스턴트입니다. 사용자가 제공한 현재 테마(JSON)와 수정 요청사항을 바탕으로, 테마의 JSON 전체 구조를 유지하면서 요청을 반영한 새로운 테마 JSON을 반환하세요. 'analysis' 필드도 수정된 내용에 맞게 한국어로 업데이트해야 합니다. Your output MUST be a valid JSON object.`;
    let tweakedThemeText;
    if (apiProvider === 'gemini') {
      const payload = [{ role: "user", parts: [{ text: systemPrompt }, { text: "현재 테마 JSON: \n" + JSON.stringify(theme, null, 2) }, { text: "\n\n수정 요청사항: " + tweakRequest }] }];
      tweakedThemeText = await generateWithGemini(activeApiKey, payload);
    } else {
      const payload = [{ role: "system", content: systemPrompt }, { role: "user", content: `현재 테마 JSON: \n${JSON.stringify(theme, null, 2)}\n\n수정 요청사항: ${tweakRequest}` }];
      tweakedThemeText = await generateWithChatGPT(activeApiKey, payload);
    }
    const tweakedTheme = extractJson(tweakedThemeText);
    if (!tweakedTheme.analysis || !tweakedTheme.colors) throw new Error("AI로부터 유효한 테마 구조를 받지 못했습니다.");

    setTheme(tweakedTheme);
    setAnalysis(tweakedTheme.analysis);
  }, setIsTweakingTheme, activeApiKey);

  const handleCritique = () => handleApiCall(async () => {
    if (apiProvider === 'chatgpt') {
        setError("ChatGPT 모드에서는 AI 디자인 비평 기능이 지원되지 않습니다.");
        return;
    }
    const systemPrompt = `당신은 세계적인 웹 디자인 평론가입니다. 주어진 테마의 JSON 데이터를 분석하여, 디자인의 장점과 개선점을 설명하는 비평(critique)을 작성하고, 개선을 위한 구체적인 수정 요청 프롬프트 3가지(suggestions)를 제안해주세요. 모든 결과는 반드시 한국어로 작성되어야 합니다. Your output MUST be a valid JSON object.`;
    let critiqueText;
    if (apiProvider === 'gemini') {
        const payload = [{ role: "user", parts: [{ text: systemPrompt }, {text: `분석할 테마 JSON:\n${JSON.stringify(theme, null, 2)}`}] }];
        critiqueText = await generateWithGemini(activeApiKey, payload);
    }
    setDesignCritique(extractJson(critiqueText));
  }, setIsCritiquing, activeApiKey);

  const handleReset = () => {
    setTheme(initialTheme);
    setAnalysis(initialTheme.analysis);
    setError(null);
    setSuggestedContent(null);
    setGeneratedImageUrl(null);
    setDesignCritique(null);
    setAppliedBackground(null);
  };

  const themeJsonString = useMemo(() => JSON.stringify(theme, null, 2), [theme]);
  const copyJsonToClipboard = () => {
    const textArea = document.createElement("textarea");
    textArea.value = themeJsonString;
    textArea.style.top = "0"; textArea.style.left = "0"; textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus(); textArea.select();
    try { document.execCommand('copy'); } catch (err) { console.error('Fallback: Oops, unable to copy', err); }
    document.body.removeChild(textArea);
  };
  const downloadJsonFile = () => {
    const blob = new Blob([themeJsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${theme.id || 'custom-theme'}.json`;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
  };

  return (
    <>
      <style>{`
        :root { --font-primary: sans-serif; --font-title: sans-serif; --radius-sm: 4px; --radius-md: 8px; --radius-lg: 12px; --radius-full: 9999px; }
        body { background: var(--theme-body-bg); color: var(--theme-text-primary); font-family: var(--font-primary); transition: background 0.3s ease, color 0.3s ease; }
        .title-font { font-family: var(--font-title); }
        .text-primary { color: var(--theme-text-primary); } .text-secondary { color: var(--theme-text-secondary); } .text-tertiary { color: var(--theme-text-tertiary); }
        .bg-body-bg { background: var(--theme-body-bg); } .bg-section-bg { background-color: var(--theme-section-bg); } .bg-card-bg { background-color: var(--theme-card-bg); }
        .border-border-light { border-color: var(--theme-border-light); } .border-border-medium { border-color: var(--theme-border-medium); }
        .text-accent-primary { color: var(--theme-accent-primary); }
        .card-title { color: var(--theme-card-title); } .card-subtitle { color: var(--theme-card-subtitle); } .card-icon { color: var(--theme-card-icon); }
        .btn-primary { background-color: var(--theme-button-primary-bg); color: var(--theme-button-primary-text); } .btn-primary:hover { background-color: var(--theme-button-primary-hover); }
        .btn-secondary { background-color: var(--theme-button-secondary-bg); color: var(--theme-button-secondary-text); } .btn-secondary:hover { background-color: var(--theme-button-secondary-hover); }
        .link-color { color: var(--theme-link-color); } .link-hover:hover { color: var(--theme-link-hover); }
        .input-bg { background-color: var(--theme-input-bg); } .input-border { border: 1px solid var(--theme-input-border); } .input-focus:focus { border-color: var(--theme-input-focus); }
        .placeholder-tertiary::placeholder { color: var(--theme-text-tertiary); }
        .rounded-sm { border-radius: var(--radius-sm); } .rounded-md { border-radius: var(--radius-md); } .rounded-lg { border-radius: var(--radius-lg); } .rounded-full { border-radius: var(--radius-full); }
        .alert-error-bg { background-color: var(--theme-alert-error-bg, #fee2e2); } .alert-error-border { border-color: var(--theme-alert-error-border, #fca5a5); } .alert-error-text { color: var(--theme-alert-error-text, #991b1b); }
        .modal-overlay { background-color: var(--theme-modal-overlay, rgba(0,0,0,0.5)); } .modal-content-bg { background-color: var(--theme-modal-content-bg); }
        .modal-title { color: var(--theme-modal-title); } .modal-body { color: var(--theme-modal-body); }
        .tab-button { color: var(--theme-tab-button-text); padding: 0.75rem 1rem; font-weight: 600; border-bottom: 2px solid transparent; display: inline-flex; align-items: center; }
        .tab-button:hover { color: var(--theme-tab-button-active-text); }
        .tab-active { color: var(--theme-tab-button-active-text); border-color: var(--theme-tab-button-active-indicator); }
        .accordion-bg { background-color: var(--theme-accordion-bg); } .accordion-border { border-bottom: 1px solid var(--theme-accordion-border); }
        .accordion-title { color: var(--theme-accordion-title); } .accordion-icon { color: var(--theme-accordion-icon); } .accordion-body-text { color: var(--theme-accordion-body-text); }
        .form-checkbox { color: var(--theme-form-checkbox-accent); } .form-radio { color: var(--theme-form-radio-accent); }
        .table-header-bg { background-color: var(--theme-table-header-bg); } .table-cell-border { border-bottom: 1px solid var(--theme-table-cell-border); }
        .table-row-hover:hover { background-color: var(--theme-table-row-hover); }
        .nav-bg { background-color: var(--theme-nav-bg); } .nav-brand { color: var(--theme-nav-brand); }
        .nav-link { color: var(--theme-nav-link); transition: color 0.2s; } .nav-link:hover { color: var(--theme-nav-link-hover); }
        .nav-link-active { color: var(--theme-nav-active); } .nav-mobile-btn { color: var(--theme-nav-mobile-btn); }
        .nav-border { border-color: var(--theme-nav-border); }
        .badge-primary-bg { background-color: var(--theme-badge-primary-bg); } .badge-primary-text { color: var(--theme-badge-primary-text); }
        .badge-success-bg { background-color: var(--theme-badge-success-bg); } .badge-success-text { color: var(--theme-badge-success-text); }
        .badge-warning-bg { background-color: var(--theme-badge-warning-bg); } .badge-warning-text { color: var(--theme-badge-warning-text); }
        .badge-error-bg { background-color: var(--theme-badge-error-bg); } .badge-error-text { color: var(--theme-badge-error-text); }
        .badge-info-bg { background-color: var(--theme-badge-info-bg); } .badge-info-text { color: var(--theme-badge-info-text); }
        .alert-info-bg { background-color: var(--theme-alert-info-bg); } .alert-info-border { border-color: var(--theme-alert-info-border); } .alert-info-text { color: var(--theme-alert-info-text); }
        .alert-success-bg { background-color: var(--theme-alert-success-bg); } .alert-success-border { border-color: var(--theme-alert-success-border); } .alert-success-text { color: var(--theme-alert-success-text); }
        .alert-warning-bg { background-color: var(--theme-alert-warning-bg); } .alert-warning-border { border-color: var(--theme-alert-warning-border); } .alert-warning-text { color: var(--theme-alert-warning-text); }
      `}</style>
      <div className="min-h-screen w-full flex flex-col lg:flex-row" style={{maxWidth: '1920px', margin: '0 auto'}}>
        <aside className="w-full lg:w-1/3 lg:max-w-md xl:max-w-lg p-4 space-y-4 bg-section-bg border-r border-border-light overflow-y-auto">
          <header className="flex items-center justify-between p-2">
            <div className="flex items-center space-x-3">
                <Palette className="w-8 h-8 text-accent-primary" />
                <div><h1 className="text-xl font-bold title-font text-primary">미리내맨의 AI 테마 생성기</h1><p className="text-sm text-secondary">AI와 함께 디자인하고 완성하세요</p></div>
            </div>
            <Button onClick={handleReset} variant="secondary" className="p-2 h-10 w-10"><RotateCcw className="w-5 h-5"/></Button>
          </header>
          <ApiProviderSelector provider={apiProvider} setProvider={setApiProvider} />
          <ApiKeyManager 
            apiKey={apiProvider === 'gemini' ? geminiApiKey : chatGptApiKey}
            setApiKey={apiProvider === 'gemini' ? setGeminiApiKey : setChatGptApiKey}
            provider={apiProvider}
          />
          <InputArea onGenerate={handleGenerateTheme} isLoading={isLoading} />
          {error && <Alert variant="error" icon={ServerCrash}>{error}</Alert>}
          {analysis && !isLoading && (
            <ResultsArea 
                analysis={analysis} 
                theme={theme}
                themeJson={themeJsonString} 
                onCopy={copyJsonToClipboard}
                onDownload={downloadJsonFile}
                onSuggestContent={handleSuggestContent}
                isSuggestingContent={isSuggestingContent}
                suggestedContent={suggestedContent}
                onGenerateImage={handleGenerateImage}
                isGeneratingImage={isGeneratingImage}
                generatedImageUrl={generatedImageUrl}
                onTweakTheme={handleTweakTheme}
                isTweakingTheme={isTweakingTheme}
                onCritique={handleCritique}
                isCritiquing={isCritiquing}
                designCritique={designCritique}
                onUpdateTheme={setTheme}
                provider={apiProvider}
                onApplyBackground={setAppliedBackground}
            />
          )}
        </aside>
        <main className="w-full lg:w-2/3 flex-1 bg-body-bg relative"><PreviewArea theme={theme} mode={mode} setMode={setMode} appliedBackground={appliedBackground} /></main>
      </div>
    </>
  );
}