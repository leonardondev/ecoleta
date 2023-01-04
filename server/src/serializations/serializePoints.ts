interface Point {
  image: string;
  image_url: string;
}

export function serializePoints(point: Point) {
  console.log({ point });
  return {
    ...point,
    image_url: `${process.env.SERVER_HOST}/uploads/${point.image}`,
  };
}
