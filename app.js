(async function(){
  try {
    const n = 9;
    const parts = [];
    for (let i = 0; i < n; i++) {
      const r = await fetch('./b64_' + i + '.txt');
      if (!r.ok) throw new Error('b64_' + i + ' ' + r.status);
      parts.push(await r.text());
    }
    const b64 = parts.join('').replace(/\s/g, '');
    const bin = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
    const ds = new DecompressionStream('gzip');
    const stream = new Blob([bin]).stream().pipeThrough(ds);
    const text = await new Response(stream).text();
    document.open(); document.write(text); document.close();
  } catch(e) {
    document.body.innerHTML = '<pre style="color:#f66;padding:24px">Load error: '+e+'</pre>';
  }
})();
