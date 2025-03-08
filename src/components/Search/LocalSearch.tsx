import { useCallback, useEffect, useState, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useAtom } from 'jotai';
import { searchModelOpen as searchModelOpenAtom } from '@/store/atoms';
import './Search.css';
import { twMerge } from 'tailwind-merge';
import IconSearch from '~icons/tabler/search';
import IconX from '~icons/tabler/x';
import IconArrowUp from '~icons/tabler/arrow-up';
import IconArrowDown from '~icons/tabler/arrow-down';
import IconEnter from '~icons/tabler/arrow-right';
import IconEsc from '~icons/tabler/x';

interface SearchResult {
  title: string;
  url: string;
  content: string;
  date?: string;
}

interface SearchModalProps {
  onClose: () => void;
  initialScrollY: number;
}

const SearchModal = ({ onClose, initialScrollY }: SearchModalProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // 模拟搜索功能
  const search = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    
    try {
      // 这里应该是从本地索引中搜索内容
      // 目前使用模拟数据，后续需要实现真正的搜索逻辑
      const mockResults: SearchResult[] = [
        {
          title: '示例文章 1',
          url: '/blog/hello-world',
          content: '这是一篇示例文章，包含了关键词 ' + searchQuery,
          date: '2023-01-01'
        },
        {
          title: '示例文章 2',
          url: '/blog/example-2',
          content: '另一篇包含关键词 ' + searchQuery + ' 的文章',
          date: '2023-02-15'
        }
      ];
      
      // 模拟网络延迟
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setResults(mockResults);
    } catch (error) {
      console.error('搜索出错:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // 处理输入变化
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    search(value);
    setSelectedIndex(-1);
  }, [search]);

  // 处理键盘导航
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => {
        const newIndex = prev < results.length - 1 ? prev + 1 : prev;
        scrollToResult(newIndex);
        return newIndex;
      });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => {
        const newIndex = prev > 0 ? prev - 1 : 0;
        scrollToResult(newIndex);
        return newIndex;
      });
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      if (results[selectedIndex]) {
        window.location.href = results[selectedIndex].url;
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  }, [results, selectedIndex, onClose]);

  // 滚动到选中的结果
  const scrollToResult = (index: number) => {
    if (index >= 0 && resultsRef.current) {
      const resultItems = resultsRef.current.querySelectorAll('.search-result-item');
      if (resultItems[index]) {
        resultItems[index].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }
    }
  };

  // 点击结果项
  const handleResultClick = (url: string) => {
    window.location.href = url;
  };

  // 聚焦输入框
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    // 恢复滚动位置
    window.scrollTo(0, initialScrollY);
    // 禁止背景滚动
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [initialScrollY]);

  // 高亮搜索结果中的关键词
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query.trim()})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  };

  return (
    <div className="DocSearch-Container" onClick={onClose}>
      <div className="DocSearch-Modal" onClick={e => e.stopPropagation()}>
        <header className="DocSearch-SearchBar">
          <div className="DocSearch-Form">
            <label className="DocSearch-MagnifierLabel">
              <IconSearch className="h-5 w-5" />
            </label>
            <div className="DocSearch-LoadingIndicator">
              {loading && (
                <svg width="20" height="20" viewBox="0 0 20 20" className="DocSearch-Spinner">
                  <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="40" strokeDashoffset="40" />
                </svg>
              )}
            </div>
            <input
              className="DocSearch-Input"
              ref={inputRef}
              type="search"
              placeholder="请输入搜索文本..."
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            {query && (
              <button
                type="reset"
                className="DocSearch-Reset"
                onClick={() => {
                  setQuery('');
                  setResults([]);
                  inputRef.current?.focus();
                }}
                title="清空输入"
                aria-label="清空输入"
              >
                <IconX className="h-4 w-4" />
              </button>
            )}
          </div>
          <button
            className="DocSearch-Cancel"
            onClick={onClose}
            title="取消"
            aria-label="取消"
          >
            取消
          </button>
        </header>

        <div className="DocSearch-Dropdown" ref={resultsRef}>
          {query.trim() === '' ? (
            <div className="DocSearch-StartScreen">
              <p className="DocSearch-Help">请输入关键词开始搜索</p>
            </div>
          ) : loading ? (
            <div className="DocSearch-Loading">
              <p className="DocSearch-Help">正在搜索...</p>
            </div>
          ) : results.length === 0 ? (
            <div className="DocSearch-NoResults">
              <div className="DocSearch-Screen-Icon">
                <IconSearch className="h-6 w-6" />
              </div>
              <p className="DocSearch-Title">未找到结果: {query}</p>
              <p className="DocSearch-Help">请尝试使用不同的关键词</p>
            </div>
          ) : (
            <div className="DocSearch-Hits">
              <div className="DocSearch-Hit-source">搜索结果</div>
              <ul>
                {results.map((result, index) => (
                  <li
                    key={result.url}
                    className={twMerge(
                      'DocSearch-Hit search-result-item',
                      selectedIndex === index && 'DocSearch-Hit--active'
                    )}
                    onClick={() => handleResultClick(result.url)}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <a href={result.url} className="DocSearch-Hit-Container">
                      <div className="DocSearch-Hit-icon">
                        <IconSearch className="h-4 w-4" />
                      </div>
                      <div className="DocSearch-Hit-content-wrapper">
                        <h3 className="DocSearch-Hit-title">
                          <span
                            dangerouslySetInnerHTML={{
                              __html: highlightText(result.title, query),
                            }}
                          />
                        </h3>
                        <p className="DocSearch-Hit-path">
                          <span
                            dangerouslySetInnerHTML={{
                              __html: highlightText(result.content, query),
                            }}
                          />
                        </p>
                      </div>
                      <div className="DocSearch-Hit-action">
                        <IconEnter className="h-4 w-4" />
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <footer className="DocSearch-Footer">
          <div className="DocSearch-Commands">
            <div className="DocSearch-Commands-Key">
              <IconArrowDown className="h-3 w-3" />
              <IconArrowUp className="h-3 w-3" />
            </div>
            <span className="DocSearch-Label">移动光标</span>
            <div className="DocSearch-Commands-Key">
              <IconEnter className="h-3 w-3" />
            </div>
            <span className="DocSearch-Label">选中</span>
            <div className="DocSearch-Commands-Key">
              <IconEsc className="h-3 w-3" />
            </div>
            <span className="DocSearch-Label">退出</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default function LocalSearch() {
  const [searchModalOpen, setSearchModalOpen] = useAtom(searchModelOpenAtom);

  const onClose = useCallback(() => {
    setSearchModalOpen(false);
  }, [setSearchModalOpen]);

  // 处理键盘事件
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 按下 / 键打开搜索
      if (e.key === '/' && !searchModalOpen && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
      // 按下 Esc 键关闭搜索
      else if (e.key === 'Escape' && searchModalOpen) {
        e.preventDefault();
        setSearchModalOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [searchModalOpen, setSearchModalOpen]);

  return (
    <>
      {searchModalOpen && createPortal(
        <SearchModal
          onClose={onClose}
          initialScrollY={window.scrollY}
        />,
        document.body,
      )}
    </>
  );
}