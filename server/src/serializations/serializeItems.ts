interface Item {
  id: number;
  image: string;
  title: string;
}

export function serializeItems(item: Item) {
  return {
    id: item.id,
    title: item.title,
    image_url: `${process.env.SERVER_HOST}/items/${item.image}`,
  };
}
