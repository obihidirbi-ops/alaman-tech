/**
 * Utility to safely open documents (both web URLs and Base64 Data URIs) in a new browser tab.
 * Edge and Chrome block top-frame navigation to `data:` URLs resulting in a grey/blank screen.
 * This function converts base64 Data URIs to a Blob Object URL and renders a clean HTML viewer window with download capabilities.
 */
export const openPdfDocument = (url, fileName = 'Alaman-Technology-Company-Profile.pdf') => {
  if (!url) {
    alert('لا يوجد ملف بروفايل أو رابط مرفق لتصفحه حالياً.');
    return;
  }

  const cleanUrl = url.trim();

  if (cleanUrl.startsWith('data:')) {
    try {
      const parts = cleanUrl.split(';base64,');
      const contentType = parts[0].replace('data:', '') || 'application/pdf';
      const base64Data = parts[1] || '';
      
      const binaryStr = window.atob(base64Data);
      const len = binaryStr.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryStr.charCodeAt(i);
      }
      
      const blob = new Blob([bytes], { type: contentType });
      const blobUrl = URL.createObjectURL(blob);

      // Open a clean HTML document viewer in a new tab to avoid Edge data URL top-frame block
      const viewerWin = window.open('', '_blank');
      if (viewerWin) {
        viewerWin.document.write(`
          <!DOCTYPE html>
          <html dir="rtl" lang="ar">
          <head>
            <meta charset="utf-8">
            <title>شركة تقنية الأمان الأولى المحدودة — البروفايل التعريفي الرسمي (PDF)</title>
            <style>
              body { margin: 0; padding: 0; background: #0f172a; color: white; font-family: system-ui, -apple-system, sans-serif; display: flex; flex-direction: column; height: 100vh; overflow: hidden; }
              header { background: #090d16; padding: 12px 24px; display: flex; items-center; justify-content: space-between; border-bottom: 1px solid #1e293b; }
              .title { font-weight: bold; font-size: 14px; color: #f8fafc; display: flex; align-items: center; gap: 8px; }
              .btn { background: #e31e24; color: white; border: none; padding: 8px 18px; border-radius: 8px; font-weight: bold; cursor: pointer; text-decoration: none; font-size: 12px; transition: background 0.2s; }
              .btn:hover { background: #c41419; }
              iframe { flex: 1; border: none; width: 100%; height: 100%; background: #1e293b; }
            </style>
          </head>
          <body>
            <header>
              <div class="title">📄 شركة تقنية الأمان الأولى المحدودة — البروفايل التعريفي (PDF)</div>
              <a href="${blobUrl}" download="${fileName}" class="btn">⬇️ تحميل البروفايل PDF</a>
            </header>
            <iframe src="${blobUrl}"></iframe>
          </body>
          </html>
        `);
        viewerWin.document.close();
      } else {
        // Fallback: direct download link if popup blocked
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } catch (err) {
      console.error('Error opening base64 document:', err);
      window.open(cleanUrl, '_blank');
    }
  } else {
    window.open(cleanUrl, '_blank');
  }
};

