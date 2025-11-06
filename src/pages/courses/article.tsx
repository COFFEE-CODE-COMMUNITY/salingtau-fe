import React from "react";

interface ArticleProps {
  title?: string;
  content?: string;
}

const Article: React.FC<ArticleProps> = ({
                                           title = "Lorem Ipsum Article",
                                           content = `
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.</p>
<h2>Section 1</h2>
<p>Nulla facilisi. Integer lacinia sollicitudin massa, sit amet imperdiet arcu blandit eget.</p>
<ul>
  <li>Point 1</li>
  <li>Point 2</li>
  <li>Point 3</li>
</ul>
<h2>Section 2</h2>
<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
`
                                         }) => {
  return (
    <div className="p-8 bg-white max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">{title}</h1>
      <div
        className="prose prose-lg text-gray-700"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default Article;
