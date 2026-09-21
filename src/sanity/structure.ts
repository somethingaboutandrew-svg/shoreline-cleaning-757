import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Shoreline Cleaning LLC")
    .items([
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      S.listItem()
        .title("Pages")
        .child(
          S.list()
            .title("Pages")
            .items([
              S.listItem().title("Home page").child(S.document().schemaType("homePage").documentId("homePage")),
              S.listItem().title("About page").child(S.document().schemaType("aboutPage").documentId("aboutPage")),
              S.listItem()
                .title("Service areas page")
                .child(S.document().schemaType("serviceAreasPage").documentId("serviceAreasPage")),
            ]),
        ),
      S.listItem().title("Services").schemaType("service").child(S.documentTypeList("service").title("Services")),
      S.listItem()
        .title("Gallery")
        .schemaType("galleryImage")
        .child(S.documentTypeList("galleryImage").title("Gallery")),
      S.listItem()
        .title("Before & After")
        .schemaType("beforeAfter")
        .child(S.documentTypeList("beforeAfter").title("Before & After")),
      S.listItem().title("Reviews").schemaType("review").child(S.documentTypeList("review").title("Reviews")),
      S.listItem().title("FAQs").schemaType("faq").child(S.documentTypeList("faq").title("FAQs")),
      S.listItem().title("Team").schemaType("teamMember").child(S.documentTypeList("teamMember").title("Team")),
      S.listItem()
        .title("Blog")
        .child(
          S.list()
            .title("Blog")
            .items([
              S.listItem().title("Posts").schemaType("blogPost").child(S.documentTypeList("blogPost").title("Posts")),
              S.listItem()
                .title("Categories")
                .schemaType("blogCategory")
                .child(S.documentTypeList("blogCategory").title("Categories")),
            ]),
        ),
      S.listItem().title("Legal").schemaType("legalPage").child(S.documentTypeList("legalPage").title("Legal")),
    ]);
