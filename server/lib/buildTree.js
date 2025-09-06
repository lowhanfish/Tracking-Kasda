

const buildTree = (data) =>{
  const map = {};
  const roots = [];

  // buat map id -> node
  data.forEach(item => {
    map[item.id] = { ...item, children: [] };
  });

  // susun hirarki
  data.forEach(item => {
    if (item.parent) {
      // masukkan ke children parent
      map[item.parent].children.push(map[item.id]);
    } else {
      // kalau parent = null berarti root
      roots.push(map[item.id]);
    }
  });

  return roots;
}


export default buildTree
