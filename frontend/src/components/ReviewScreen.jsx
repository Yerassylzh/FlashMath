import { useApp } from "../context/useApp";

export default function ReviewScreen() {
  const { selectedOptions, setSelectedOptions, testCards } = useApp();

  console.log(selectedOptions);
  console.log(testCards);

  let total = 0;
  for (let i = 0; i < testCards.length; i++) {
    total += selectedOptions[i] == testCards[i].solutionIndex;
  }

  return (
    <div>
      {total} out of {testCards.length}
    </div>
  );
}
