/* global NexT, CONFIG */

document.addEventListener('page:loaded', async () => {
  if (!CONFIG.page.comments) return;
  const config = CONFIG.utterances;
  if (!config?.repo) return;

  await NexT.utils.loadComments('.utterances-container');
  await NexT.utils.getScript('https://utteranc.es/client.js', {
    attributes: {
      async       : true,
      crossOrigin : 'anonymous',
      'repo'      : config.repo,
      'issue-term': config.issue_term,
      'theme'     : config.theme
    },
    parentNode: document.querySelector('.utterances-container')
  });
});
