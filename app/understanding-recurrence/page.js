
export const metadata = {
  title: 'Test Title',
  description: "Test Desc",
  openGraph: {
    title: 'Test Title',
    description: 'Test Desc',
    type: 'website',
    locale: 'en_US',
    url: 'url',
    images: [
      {
        url: "#",
        secureUrl:
          "#",
        alt: "",
      },
    ],
  },
  alternates: {
    canonical: 'url',
  },
};


export default function page() {
  return (
    <h2>test page</h2>
  )
}