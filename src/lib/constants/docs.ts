export const docs = Object.entries(import.meta.glob('/src/docs/**/*.svx', { eager: true })).map(
  ([filepath, doc]) => {
    // const html = parse(doc.default.render().html)
    // const preview = doc.metadata.preview ? parse(doc.metadata.preview) : html.querySelector('p')

    console.log(doc);

    return {
      // ...doc.metadata,

      originSlug: filepath,
      // generate the slug from the file path
      slug: filepath
        .replace(/(\/index)?\.svx/, '')
        .split('/')
        .pop(),

      // // whether or not this file is `my-post.md` or `my-post/index.md`
      // // (needed to do correct dynamic import in posts/[slug].svelte)
      // isIndexFile: filepath.endsWith('/index.md'),

      // // format date as yyyy-MM-dd
      // date: post.metadata.date
      //   ? format(
      //       // offset by timezone so that the date is correct
      //       addTimezoneOffset(new Date(post.metadata.date)),
      //       'yyyy-MM-dd'
      //     )
      //   : undefined,

      // preview: {
      //   html: preview.toString(),
      //   // text-only preview (i.e no html elements), used for SEO
      //   text: preview.structuredText ?? preview.toString()
      // },

      // // get estimated reading time for the post
      // readingTime: readingTime(html.structuredText).text
    };
  },
);
// .map((post, index, allPosts) => ({
//   ...post,
//   next: allPosts[index - 1],
//   previous: allPosts[index + 1]
// }))
