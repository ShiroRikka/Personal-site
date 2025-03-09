import React from 'react';

export interface GiscusConfig {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
  mapping: string;
  reactionsEnabled?: string;
  emitMetadata?: string;
  inputPosition?: string;
  theme?: string;
  lang?: string;
  loading?: string;
}

const Giscus: React.FC<GiscusConfig> = (props) => {
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', props.repo);
    script.setAttribute('data-repo-id', props.repoId);
    script.setAttribute('data-category', props.category);
    script.setAttribute('data-category-id', props.categoryId);
    script.setAttribute('data-mapping', props.mapping);
    script.setAttribute('data-reactions-enabled', props.reactionsEnabled || '1');
    script.setAttribute('data-emit-metadata', props.emitMetadata || '0');
    script.setAttribute('data-input-position', props.inputPosition || 'bottom');
    script.setAttribute('data-theme', props.theme || 'light');
    script.setAttribute('data-lang', props.lang || 'zh-CN');
    script.setAttribute('data-loading', props.loading || 'lazy');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    const container = document.getElementById('giscus-container');
    if (container) {
      container.appendChild(script);
    }

    return () => {
      const container = document.getElementById('giscus-container');
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [props]);

  return <div id="giscus-container" className="giscus" />;
};

export default Giscus;