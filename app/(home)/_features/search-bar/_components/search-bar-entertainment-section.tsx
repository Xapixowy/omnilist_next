import SearchBarEntertainmentObjectCard, {
  SearchBarEntertainmentObjectCardProps,
} from './search-bar-entertainment-object-card';

export type SearchBarEntertainmentSectionProps = {
  items: SearchBarEntertainmentObjectCardProps[];
};

export default function SearchBarEntertainmentSection({ items }: SearchBarEntertainmentSectionProps) {
  return (
    <div>
      {items.map((item, index) => (
        <SearchBarEntertainmentObjectCard key={index} {...item} />
      ))}
    </div>
  );
}
