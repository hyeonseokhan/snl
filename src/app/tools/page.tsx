import Link from 'next/link';
import { getFilteredLinks, LinkItem } from '../../config/links';

export default function Tools() {
  const links = getFilteredLinks(['goldCalc', 'raidAuction']);
  return (
    <div className="grid w-full grid-cols-1 gap-1 md:grid-cols-2">
      {links.map((link) => {
        return <Card key={link.en} tool={link} />;
      })}
    </div>
  );
}

const Card = ({ tool }: { tool: LinkItem }) => {
  return (
    <Link key={tool.en} href={tool.href}>
      <div className="w-full rounded-lg border border-transparent bg-[var(--gray-3)] py-2 transition-all duration-300 hover:border-[1px] hover:border-[var(--focus-11)]">
        <div className="flex flex-row items-center">
          <div className="items-center px-4 text-lg font-semibold">
            {tool.ko}
          </div>
          {tool.isNew ? (
            <span className="text-sm font-semibold text-red-700">new</span>
          ) : null}
        </div>
        <div className="items-center px-4 pt-2 text-sm text-[var(--gray-10)]">
          {tool.description}
        </div>
      </div>
    </Link>
  );
};
