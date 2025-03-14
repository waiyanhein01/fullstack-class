import { Link } from "react-router";

interface TitleProps {
  title: string;
  href: string;
  linkTitle: string;
}

const Title = ({ title, href, linkTitle }: TitleProps) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold 2xl:text-3xl">{title}</h1>
      <Link to={href} className="lg:text-base text-sm underline text-primary">
        {linkTitle}
      </Link>
    </div>
  );
};

export default Title;
