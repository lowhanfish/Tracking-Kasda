/**
 * Membangun struktur data nested dari array flat
 * dan menyaring item yang tidak memiliki akses viewx
 * * @param {Array} data - Array objek menu flat
 * @returns {Array} - Array menu nested yang sudah difilter
 */
const buildTreeAccess = (data) => {
  if (!data || !Array.isArray(data)) return [];

  // 1. Mapping data ke dalam objek dengan tambahan properti children
  const itemMap = {};
  data.forEach((item) => {
    itemMap[item.id] = { ...item, children: [] };
  });

  const root = [];

  // 2. Susun struktur pohon (Tree)
  data.forEach((item) => {
    const currentItem = itemMap[item.id];
    if (item.parent === null) {
      root.push(currentItem);
    } else {
      const parentItem = itemMap[item.parent];
      if (parentItem) {
        parentItem.children.push(currentItem);
      }
    }
  });

  // 3. Fungsi rekursif untuk filter & sorting
  const processNodes = (nodes) => {
    return nodes
      .filter((node) => {
        // Proses anak-anaknya terlebih dahulu (Bottom-up filtering)
        if (node.children && node.children.length > 0) {
          node.children = processNodes(node.children);
        }

        // Syarat tampil: 
        // Punya viewx: 1 ATAU memiliki anak yang lolos filter
        const hasAccess = node.viewx === 1;
        const hasVisibleChildren = node.children && node.children.length > 0;

        return hasAccess || hasVisibleChildren;
      })
      // Tambahan: Urutkan berdasarkan properti 'number'
      .sort((a, b) => (a.number || 0) - (b.number || 0));
  };

  return processNodes(root);
};

export default buildTreeAccess;