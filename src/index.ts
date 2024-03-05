import '@logseq/libs';

function main() {
  logseq.Editor.registerSlashCommand('Big Bang', async () => {
    const { content, uuid } = (await logseq.Editor.getCurrentBlock()) ?? {};

    logseq.UI.showMsg(`
        [:div.p-2
          [:h1 "#${uuid}"]
          [:h2.text-xl "${content}"]]
      `);
  });
}
logseq.ready(main).catch(console.error);
