import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router";

interface Link {
  path?: string;
  title: string;
  onClick?: () => void;
}

interface BreadCrumbProps {
  currentPage: string;
  links?: Link[];
}

export function BreadCrumb({ currentPage, links }: BreadCrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <Link to="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {links &&
          links.map((link: Link) => (
            <BreadcrumbItem key={link.path}>
              <BreadcrumbLink>
                <Link
                  key={link.path}
                  to={link.path ?? "#"}
                  onClick={link.onClick}
                >
                  {link.title}
                </Link>
              </BreadcrumbLink>
              <BreadcrumbSeparator />
            </BreadcrumbItem>
          ))}
        <BreadcrumbItem>
          <BreadcrumbPage>{currentPage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
