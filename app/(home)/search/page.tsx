import FilterPills from './_components/filter-pills';
import Filters from './_components/filters';
import ResultsContainer from './_components/results-container';
import SearchBar from './_components/search-bar';
import Tabs from './_components/tabs';

export default function SearchPage() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-[360px_1fr] auto-rows-min gap-8'>
      <SearchBar className='col-span-2' />
      <FilterPills className='col-span-2' />
      <Tabs className='col-span-2' />
      <Filters className='col-span-2 lg:col-span-1' />
      <ResultsContainer />
    </div>
  );
}
