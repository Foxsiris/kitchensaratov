export function catalogInclude(publishedOnly) {
  return {
    displayGroups: {
      orderBy: { sortOrder: 'asc' },
      include: {
        brandEntity: true,
        sections: {
          orderBy: { sortOrder: 'asc' },
          include: {
            products: {
              orderBy: { sortOrder: 'asc' },
              ...(publishedOnly ? { where: { published: true } } : {}),
            },
          },
        },
      },
    },
  };
}
