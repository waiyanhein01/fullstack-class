import DOMPurify from 'dompurify';

interface SanitizedComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  htmlContent: string;
}

const SanitizedComponent = ({ htmlContent } : SanitizedComponentProps) => {
  const sanitizedHTML = DOMPurify.sanitize(htmlContent);

  return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
};

export default SanitizedComponent;
