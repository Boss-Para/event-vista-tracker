
import MainLayout from "@/components/layout/MainLayout";
import PriceCalculator from "@/components/calculator/PriceCalculator";

const Calculator = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Price Calculator</h1>
        <p className="text-muted-foreground">Estimate the cost of your event services</p>
      </div>

      <PriceCalculator />
    </MainLayout>
  );
};

export default Calculator;
