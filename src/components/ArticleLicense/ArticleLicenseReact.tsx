import React from 'react';
import { twMerge } from 'tailwind-merge';
import { Icon } from '@iconify/react';

// 简化版的DateTime组件，用于React版本的ArticleLicense
const DateTime: React.FC<{ date: Date }> = ({ date }) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return <>{formatDate(date)}</>;
};

export interface ArticleLicenseProps extends React.HTMLAttributes<HTMLDivElement> {
  url: string;
  title: string;
  date: Date;
  updateDate: Date;
  author: string;
  licenseName: string;
  licenseUrl?: string;
  infoText?: string;
}

const ArticleLicenseReact: React.FC<ArticleLicenseProps> = ({
  url,
  title,
  date,
  updateDate,
  author,
  licenseName,
  licenseUrl,
  infoText,
  className,
  ...rest
}) => {
  return (
    <div className={twMerge(
      'relative bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 p-5 overflow-hidden',
      className
    )} {...rest}>
      <div className="space-y-2">
        <p className="text-sm font-bold">{title}</p>
        <p className="text-sm opacity-60">
          <a href={url} target="_blank" rel="noreferrer">{url}</a>
        </p>
        <div className="flex space-x-4">
          <div className="text-sm">
            <h6 className="mb-1">作者</h6>
            <p>{author}</p>
          </div>
          <div className="text-sm">
            <h6 className="mb-1">发布于</h6>
            <p><DateTime date={date} /></p>
          </div>
          <div className="text-sm">
            <h6 className="mb-1">编辑于</h6>
            <p><DateTime date={updateDate} /></p>
          </div>
          <div className="text-sm">
            <h6 className="mb-1">许可协议</h6>
            <div className="flex space-x-1">
              {licenseUrl ? (
                <a href={licenseUrl} target="_blank" rel="noreferrer" className="flex items-center">
                  <Icon icon="simple-icons:creativecommons" className="w-4 h-4 mr-1" />
                  {licenseName}
                </a>
              ) : (
                <span className="flex items-center">
                  <Icon icon="simple-icons:creativecommons" className="w-4 h-4 mr-1" />
                  {licenseName}
                </span>
              )}
            </div>
          </div>
        </div>
        {infoText && <p className="text-xs opacity-60">{infoText}</p>}
      </div>
    </div>
  );
};

export default ArticleLicenseReact;