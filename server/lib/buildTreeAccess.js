/**
 * Membangun struktur data nested dari array flat
 * dan menyaring item berdasarkan viewx
 * 
 * @param {Array} data - Array objek menu flat dari database
 * @returns {Array} - Array menu nested yang sudah difilter
 * 
 * Contoh input data (flat):
 * [
 *   { id: 1, title: "Dashboard", parent: null, viewx: 1, children: [] },
 *   { id: 2, title: "Master", parent: null, viewx: 0, children: [] },
 *   { id: 3, title: "User", parent: 2, viewx: 1, children: [] }
 * ]
 * 
 * Contoh output (nested & filtered):
 * [
 *   { id: 1, title: "Dashboard", parent: null, viewx: 1, children: [] }
 *   // "Master" disembunyikan karena viewx=0 dan tidak ada children yang tampil
 * ]
 */

var buildTreeAccess = function(data) {
    // Validasi: jika data kosong atau bukan array, kembalikan array kosong
    if (!data || !Array.isArray(data)) return [];

    // ========================================
    // LANGKAH 1: Mapping data ke dalam objek
    // ========================================
    // Ubah array flat menjadi object dengan key = id
    // Setiap item ditambahkan property children = []
    // 
    // Contoh:
    // Input:  [{ id: 1, title: "A", parent: null }, { id: 2, title: "B", parent: 1 }]
    // Output: { 
    //           1: { id: 1, title: "A", parent: null, children: [] },
    //           2: { id: 2, title: "B", parent: 1, children: [] }
    //         }
    var itemMap = {};
    data.forEach(function(item) {
        itemMap[item.id] = {
            id: item.id,
            number: item.number,
            title: item.title,
            icon: item.icon,
            path: item.path,
            parent: item.parent,
            multiple: item.multiple,
            createdAt: item.createdAt,
            createdBy: item.createdBy,
            viewx: item.viewx,
            addx: item.addx,
            updatex: item.updatex,
            removex: item.removex,
            children: []
        };
    });

    // Array untuk menyimpan root nodes (parent = null)
    var roots = [];

    // ========================================
    // LANGKAH 2: Susun struktur pohon (Tree)
    // ========================================
    // Masukkan setiap item ke parent yang sesuai
    // Jika parent = null, masukkan ke array roots
    // 
    // Contoh:
    // Item dengan parent: 2 (child of 1) -> itemMap[1].children.push(itemMap[2])
    // Item tanpa parent: masukkan ke roots
    data.forEach(function(item) {
        var currentItem = itemMap[item.id];
        if (item.parent === null) {
            // Jika parent = null, berarti ini root node
            roots.push(currentItem);
        } else {
            // Jika punya parent, cari parent di itemMap dan masukkan sebagai children
            var parentItem = itemMap[item.parent];
            if (parentItem) {
                parentItem.children.push(currentItem);
            }
        }
    });

    // ========================================
    // LANGKAH 3: Filter dan Urutkan (Rekursif)
    // ========================================
    // Fungsi untuk memfilter node berdasarkan viewx
    // dan mengurutkan berdasarkan number
    // 
    // Logika filter:
    // - Tampilkan node jika viewx === 1
    // - ATAU jika node memiliki children yang tampil
    // - Ini memungkinkan parent dengan viewx=0 tetap tampil jika punya children dengan viewx=1
    var processNodes = function(nodes) {
        var hasil = [];

        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];

            // Proses children terlebih dahulu (rekursif)
            // Ini memastikan children difilter sebelum parent
            if (node.children && node.children.length > 0) {
                node.children = processNodes(node.children);
            }

            // Cek apakah node boleh ditampilkan
            var hasAccess = node.viewx === 1;  // Jika viewx = 1, boleh tampil
            var hasVisibleChildren = node.children && node.children.length > 0;  // Jika punya children yang tampil

            // Tampilkan jika punya akses ATAU punya children yang tampil
            if (hasAccess || hasVisibleChildren) {
                hasil.push(node);
            }
        }

        // Urutkan berdasarkan properti 'number' (ascending)
        hasil.sort(function(a, b) {
            return (a.number || 0) - (b.number || 0);
        });

        return hasil;
    };

    // Jalankan proses filter pada root nodes
    return processNodes(roots);
};

export default buildTreeAccess;

