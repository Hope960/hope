import React from 'react';

const getAspectRatioClass = (ratio) => {
  switch (ratio) {
    case '16:9':
      return 'aspect-[16/9]';
    case '9:16':
      return 'aspect-[9/16]';
    case '1:1':
      return 'aspect-square';
    default:
      return 'aspect-video'; // Default widescreen
  }
};

const VideoPlayer = ({ videoUrl, onReset, aspectRatio }) => {
  return React.createElement(
    'div',
    { className: 'w-full text-center' },
    React.createElement('h2', { className: 'text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-teal-400' }, 'Your Video is Ready!'),
    React.createElement(
      'div',
      { className: `w-full max-w-full mx-auto bg-black rounded-lg overflow-hidden mb-6 shadow-lg border border-gray-700 ${getAspectRatioClass(aspectRatio)}` },
      React.createElement('video', { src: videoUrl, controls: true, autoPlay: true, loop: true, className: 'w-full h-full' })
    ),
    React.createElement(
      'div',
      { className: 'flex flex-col sm:flex-row justify-center items-center gap-4' },
      React.createElement(
        'a',
        {
          href: videoUrl,
          download: 'generated-video.mp4',
          className: 'w-full sm:w-auto px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center justify-center gap-2'
        },
        React.createElement(
          'svg',
          { xmlns: 'http://www.w3.org/2000/svg', className: 'h-5 w-5', viewBox: '0 0 20 20', fill: 'currentColor' },
          React.createElement('path', { fillRule: 'evenodd', d: 'M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 9.707a1 1 0 011.414 0L9 11.086V3a1 1 0 112 0v8.086l1.293-1.379a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z', clipRule: 'evenodd' })
        ),
        'Download Video'
      ),
      React.createElement(
        'button',
        {
          onClick: onReset,
          className: 'w-full sm:w-auto px-8 py-3 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors duration-300 flex items-center justify-center gap-2'
        },
        React.createElement(
          'svg',
          { xmlns: 'http://www.w3.org/2000/svg', className: 'h-5 w-5', viewBox: '0 0 20 20', fill: 'currentColor' },
          React.createElement('path', { fillRule: 'evenodd', d: 'M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.885-.666A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566z', clipRule: 'evenodd' })
        ),
        'Create Another'
      )
    )
  );
};

export default VideoPlayer;
