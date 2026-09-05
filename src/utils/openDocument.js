/**
 * Utility to safely open documents (both web URLs and Base64 Data URIs) in a new browser tab.
 * Browsers block opening `data:` URLs directly via `<a href="data:..." target="_blank">`.
 * This function converts base64 Data URIs to Blob URLs (`blob:http...`) so they open smoothly.
 */
export const openPdfDocument = (url) => {
  if (!url) {
    alert('لا يوجد ملف أو رابط مرفق لتصفحه');
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
      
      const newWin = window.open(blobUrl, '_blank');
      if (!newWin) {
        const a = document.createElement('a');
        a.href = blobUrl;
        a.target = '_blank';
        a.click();
      }
    } catch (err) {
      console.error('Error opening base64 document:', err);
      const win = window.open();
      if (win) {
        win.document.write(
          `<iframe src="${cleanUrl}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`
        );
      }
    }
  } else {
    window.open(cleanUrl, '_blank');
  }
};
