import menuConfig from "./menuConfig";

export default function getPageTitle(pathname) {
  let title = "";

  const traverse = (items) => {
    for (const item of items) {
      if (item.path === pathname) {
        title = item.label;
        return;
      }
      if (item.children) {
        traverse(item.children);
      }
    }
  };

  traverse(menuConfig);
  return title || "";
}
