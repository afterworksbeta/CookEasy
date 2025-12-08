
import { Category, Recipe, User, Address, PaymentMethod, Order, Product } from './types';

export const CATEGORIES: Category[] = [
  { id: '1', label: 'Vegetables', imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=200&h=150' },
  { id: '2', label: 'Meat', imageUrl: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=200&h=150' },
  { id: '3', label: 'Seafood', imageUrl: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&q=80&w=200&h=150' },
  { id: '4', label: 'Fruits', imageUrl: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&q=80&w=200&h=150' },
  { id: '5', label: 'Bakery', imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=200&h=150' },
  { id: '6', label: 'Dairy', imageUrl: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&q=80&w=200&h=150' },
];

export const RECOMMENDED_RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Lemon Tea & Mint',
    description: 'Refreshing cool drink with fresh mint leaves.',
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400',
    cookTime: '5 min',
    ingredientCount: 4,
    ingredients: ['Lemon', 'Fresh Mint', 'Tea', 'Honey']
  },
  {
    id: '2',
    title: 'Green Avocado Bowl',
    description: 'Healthy breakfast bowl with seeds and nuts.',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400',
    cookTime: '15 min',
    ingredientCount: 4,
    ingredients: ['Avocados', 'Spinach', 'Banana', 'Almond Milk']
  },
  {
    id: '3',
    title: 'Creamy Pesto Pasta',
    description: 'Classic Italian basil pesto with pine nuts.',
    imageUrl: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=400',
    cookTime: '20 min',
    ingredientCount: 5,
    ingredients: ['Pasta', 'Basil', 'Pine Nuts', 'Parmesan', 'Olive Oil']
  },
  {
    id: '4',
    title: 'Mango Sticky Rice',
    description: 'Sweet thai dessert with coconut milk.',
    imageUrl: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=400',
    cookTime: '30 min',
    ingredientCount: 5,
    ingredients: ['Mango', 'Glutinous Rice', 'Coconut Milk', 'Sugar', 'Sesame Seeds']
  },
];

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Jacky Wang',
  email: 'jacky.wang@gmail.com',
  avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150',
  role: 'user',
};

export const MOCK_ADDRESSES: Address[] = [
  { id: 'a1', label: 'Home', fullAddress: '123 Green St, Apt 4B, New York, NY 10001', isDefault: true },
  { id: 'a2', label: 'Office', fullAddress: '45 Tech Blvd, Suite 200, San Francisco, CA 94107', isDefault: false },
];

export const MOCK_CARDS: PaymentMethod[] = [
  { id: 'p1', type: 'Visa', last4: '4242', expiry: '12/25', isDefault: true },
  { id: 'p2', type: 'Mastercard', last4: '8888', expiry: '09/24', isDefault: false },
];

// --- Real Data from CSV with Fixed Images ---
export const COLES_VEGETABLES_DATABASE = [
  { name: "Cherry Tomatoes", price: 3.50, size: "250g", imageUrl: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=400" },
  { name: "Finest Dukkah Spiced Cauliflower Kit", price: 8.50, size: "895g", imageUrl: "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=400" },
  { name: "Cucumbers Continental Loose", price: 1.50, size: "1 Each", imageUrl: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&w=400" },
  { name: "Tomatoes Greenhouse Truss", price: 4.90, size: "approx. 130g", imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400" },
  { name: "Red Capsicum Loose", price: 2.20, size: "approx. 220g", imageUrl: "https://images.unsplash.com/photo-1563565375-f3fdf5efa269?auto=format&fit=crop&w=400" },
  { name: "Broccoli Medium", price: 1.80, size: "approx. 340g", imageUrl: "https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?auto=format&fit=crop&w=400" },
  { name: "Loose Brown Onions", price: 0.90, size: "approx. 200g", imageUrl: "https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?auto=format&fit=crop&w=400" },
  { name: "Onions Red Local", price: 1.20, size: "approx. 200g", imageUrl: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=400" },
  { name: "Baby Broccoli", price: 2.50, size: "1 Bunch", imageUrl: "https://images.unsplash.com/photo-1583663848850-46af132dc08e?auto=format&fit=crop&w=400" },
  { name: "Carrots", price: 1.50, size: "1Kg", imageUrl: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=400" },
  { name: "Spring Onions", price: 1.80, size: "1 Bunch", imageUrl: "https://images.unsplash.com/photo-1618881267493-27aa341fa34c?auto=format&fit=crop&w=400" },
  { name: "Garlic loose", price: 1.10, size: "approx. 60g", imageUrl: "https://images.unsplash.com/photo-1615477095431-7e87366347f7?auto=format&fit=crop&w=400" },
  { name: "Potatoes Sweet Gold", price: 3.00, size: "approx. 500g", imageUrl: "https://images.unsplash.com/photo-1596097635121-14b63b7a7c19?auto=format&fit=crop&w=400" },
  { name: "Green Zucchini", price: 1.40, size: "approx. 200g", imageUrl: "https://images.unsplash.com/photo-1593006001098-b80894e489c6?auto=format&fit=crop&w=400" },
  { name: "Creme Gold Washed Potatoes Loose", price: 1.20, size: "approx. 150g", imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400" },
  { name: "Lettuce Cos Baby Hearts", price: 3.50, size: "2 Pack", imageUrl: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=400" },
  { name: "Glasshouse Grape Tomatoes", price: 4.00, size: "200g", imageUrl: "https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&fit=crop&w=400" },
  { name: "Baby Cucumbers", price: 3.50, size: "250g", imageUrl: "https://images.unsplash.com/photo-1623851502476-d56262dc1407?auto=format&fit=crop&w=400" },
  { name: "Fresh Loose Cup Mushrooms", price: 4.50, size: "approx. 200g", imageUrl: "https://images.unsplash.com/photo-1504445851494-b778736eb0db?auto=format&fit=crop&w=400" },
  { name: "Iceberg Lettuce", price: 2.80, size: "1 Each", imageUrl: "https://images.unsplash.com/photo-1615485925694-a031e03b7d1e?auto=format&fit=crop&w=400" },
  { name: "Potatoes Washed", price: 4.00, size: "2kg", imageUrl: "https://images.unsplash.com/photo-1508313880080-c4bef0730395?auto=format&fit=crop&w=400" },
  { name: "Lebanese Cucumbers", price: 1.80, size: "approx. 160g", imageUrl: "https://images.unsplash.com/photo-1591196162299-d4529b489568?auto=format&fit=crop&w=400" },
  { name: "Brown Onions", price: 2.50, size: "1kg", imageUrl: "https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?auto=format&fit=crop&w=400" },
  { name: "Tomatoes Gourmet", price: 3.20, size: "approx. 130g", imageUrl: "https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?auto=format&fit=crop&w=400" },
  { name: "Green Asparagus", price: 5.00, size: "1 each", imageUrl: "https://images.unsplash.com/photo-1515471209610-dae1c92d8777?auto=format&fit=crop&w=400" },
  { name: "Family Broccolini", price: 4.50, size: "1 each", imageUrl: "https://images.unsplash.com/photo-1628773822503-93d3813c6fdb?auto=format&fit=crop&w=400" },
  { name: "Capsicum Green Loose", price: 2.00, size: "approx. 220g", imageUrl: "https://images.unsplash.com/photo-1596541613978-5a764d88e62f?auto=format&fit=crop&w=400" },
  { name: "Perino Entertainer Red Grape Tomatoes", price: 5.50, size: "350g", imageUrl: "https://images.unsplash.com/photo-1607305387299-a67e4e10a693?auto=format&fit=crop&w=400" },
  { name: "Fresh Purple Eggplant", price: 3.00, size: "approx. 500g", imageUrl: "https://images.unsplash.com/photo-1615286922573-45f8b9cb030a?auto=format&fit=crop&w=400" },
  { name: "Fresh Ginger Loose", price: 2.50, size: "approx. 130g", imageUrl: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400" },
  { name: "Mini Asparagus", price: 4.00, size: "1 Pack", imageUrl: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=400" },
  { name: "Red Royale Potatoes Loose", price: 1.00, size: "approx. 170g", imageUrl: "https://images.unsplash.com/photo-1566318990159-866810a08e03?auto=format&fit=crop&w=400" },
  { name: "Sweet Corn", price: 1.50, size: "1 Each", imageUrl: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=400" },
  { name: "Cauliflower Medium", price: 3.50, size: "1 Each", imageUrl: "https://images.unsplash.com/photo-1568584711275-3487202a27a9?auto=format&fit=crop&w=400" },
  { name: "Trimmed Celery Prepacked", price: 3.80, size: "1 Each", imageUrl: "https://images.unsplash.com/photo-1610915662772-24cc42e47264?auto=format&fit=crop&w=400" },
  { name: "Fresh Celery Sticks Prepacked", price: 4.20, size: "300g", imageUrl: "https://images.unsplash.com/photo-1610915662499-c4a04689036f?auto=format&fit=crop&w=400" },
  { name: "Sliced Mushrooms", price: 3.90, size: "200g", imageUrl: "https://images.unsplash.com/photo-1555546589-3221975bb5b1?auto=format&fit=crop&w=400" },
  { name: "Green Beans Prepacked", price: 4.50, size: "375g", imageUrl: "https://images.unsplash.com/photo-1551460395-92736413d80b?auto=format&fit=crop&w=400" },
  { name: "Kale Bunch Green", price: 3.50, size: "1 Each", imageUrl: "https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?auto=format&fit=crop&w=400" },
  { name: "Yellow Capsicum", price: 2.80, size: "approx. 220g", imageUrl: "https://images.unsplash.com/photo-1613511871787-8d234c98c197?auto=format&fit=crop&w=400" },
];

export const COLES_MEAT_DATABASE = [
  { name: "No Added Hormone Beef Quick Cook Scotch Fillet Steak", price: 12.00, size: "170g", imageUrl: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=400" },
  { name: "Beef Scotch Steak Fillet 2 Pack", price: 26.00, size: "480g", imageUrl: "https://images.unsplash.com/photo-1588347818621-34bd9f764a44?auto=format&fit=crop&w=400" },
  { name: "No Added Hormone Beef Porterhouse Steak With Thyme And Pepper Butter", price: 28.50, size: "500g", imageUrl: "https://images.unsplash.com/photo-1619250914856-12a9e224cd26?auto=format&fit=crop&w=400" },
  { name: "Beef Eye Fillet Steak", price: 32.00, size: "450g", imageUrl: "https://images.unsplash.com/photo-1558030006-450671960d72?auto=format&fit=crop&w=400" },
  { name: "No Added Hormone Beef Porterhouse Steak 2 Pack", price: 25.00, size: "450g", imageUrl: "https://images.unsplash.com/photo-1603048297172-c92544798d5e?auto=format&fit=crop&w=400" },
  { name: "Beef Eye Fillet Steak Small Pack", price: 18.00, size: "300g", imageUrl: "https://images.unsplash.com/photo-1504973960431-1c46b84542d5?auto=format&fit=crop&w=400" },
  { name: "Graze Grassfed Beef New York Strip Steak", price: 22.00, size: "380g", imageUrl: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=400" },
  { name: "Graze Grassfed Beef Scotch Fillet Steak", price: 16.50, size: "250g", imageUrl: "https://images.unsplash.com/photo-1544378730-8b5104b1378b?auto=format&fit=crop&w=400" },
  { name: "Beef Chuck Casserole Steak", price: 19.50, size: "850g", imageUrl: "https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=400" },
  { name: "Finest Carbon Neutral Beef Scotch Fillet Steak", price: 24.00, size: "375g", imageUrl: "https://images.unsplash.com/photo-1551028150-64b9f398f678?auto=format&fit=crop&w=400" },
  { name: "No Added Hormone Beef Quick Cook Porterhouse Steak", price: 14.00, size: "180g", imageUrl: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=400" },
  { name: "Beef Gravy", price: 8.00, size: "800g", imageUrl: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=400" },
  { name: "Beef Sizzle Steak", price: 15.00, size: "400g", imageUrl: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&w=400" },
  { name: "No Added Hormone Beef Rump Medallions", price: 18.00, size: "300g", imageUrl: "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?auto=format&fit=crop&w=400" },
];

export const COLES_FRUITS_DATABASE = [
  { name: "Blackberries", price: 5.00, size: "125g", imageUrl: "https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?auto=format&fit=crop&w=400" },
  { name: "Raspberries", price: 4.00, size: "125g", imageUrl: "https://images.unsplash.com/photo-1577009315570-5b583279147a?auto=format&fit=crop&w=400" },
  { name: "Pink Lady Apples Medium", price: 1.50, size: "approx. 200g", imageUrl: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?auto=format&fit=crop&w=400" },
  { name: "R2e2 Mangoes", price: 3.00, size: "1 Each", imageUrl: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=400" },
  { name: "Eureka Blueberries Premium", price: 6.50, size: "200g", imageUrl: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=400" },
  { name: "Lemons", price: 2.00, size: "1 Each", imageUrl: "https://images.unsplash.com/photo-1595855709915-f761a2517830?auto=format&fit=crop&w=400" },
  { name: "Medium Calypso Mangoes", price: 2.70, size: "1 Each", imageUrl: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=400" },
  { name: "Hass Avocados", price: 2.00, size: "1 Each", imageUrl: "https://images.unsplash.com/photo-1523049673856-3eb43db958cd?auto=format&fit=crop&w=400" },
  { name: "Limes Medium Loose", price: 1.80, size: "1 each", imageUrl: "https://images.unsplash.com/photo-1594313016519-640ed4744312?auto=format&fit=crop&w=400" },
  { name: "Green Kiwifruit", price: 1.20, size: "1 Each", imageUrl: "https://images.unsplash.com/photo-1585059895524-72359e06138a?auto=format&fit=crop&w=400" },
  { name: "Bananas", price: 0.72, size: "approx. 180g", imageUrl: "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&w=400" },
  { name: "Blueberries", price: 4.00, size: "170g", imageUrl: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=400" },
  { name: "Strawberries", price: 4.00, size: "250g", imageUrl: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=400" },
  { name: "Orange Navel", price: 1.05, size: "approx. 250g", imageUrl: "https://images.unsplash.com/photo-1582979512210-99b6a53385f9?auto=format&fit=crop&w=400" },
  { name: "Seedless Watermelon Cut", price: 4.50, size: "approx. 1.8kg", imageUrl: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=400" },
  { name: "Cherries Prepack", price: 7.00, size: "300g", imageUrl: "https://images.unsplash.com/photo-1528821154947-1aa3d1b74941?auto=format&fit=crop&w=400" },
  { name: "White Seedless Grapes", price: 9.90, size: "approx. 1kg", imageUrl: "https://images.unsplash.com/photo-1537640538965-1756e1f59227?auto=format&fit=crop&w=400" },
  { name: "Apple Granny Smith Medium", price: 0.83, size: "approx. 170g", imageUrl: "https://images.unsplash.com/photo-1579613832125-5d34813cdf43?auto=format&fit=crop&w=400" },
  { name: "Yellow Nectarines", price: 0.47, size: "approx. 120g", imageUrl: "https://images.unsplash.com/photo-1603051756185-1d4187c33748?auto=format&fit=crop&w=400" },
  { name: "Mandarins Afourer", price: 0.55, size: "approx. 130g", imageUrl: "https://images.unsplash.com/photo-1621508654686-809f23efdabc?auto=format&fit=crop&w=400" },
  { name: "Topless Pineapple", price: 5.50, size: "1 each", imageUrl: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=400" },
  { name: "Pink Lady Apples", price: 7.50, size: "1kg", imageUrl: "https://images.unsplash.com/photo-1630563451961-ac2ff2767cb5?auto=format&fit=crop&w=400" },
  { name: "White Nectarines", price: 0.58, size: "approx. 150g", imageUrl: "https://images.unsplash.com/photo-1596229989932-a50352a420b7?auto=format&fit=crop&w=400" },
  { name: "Pear Packham", price: 1.18, size: "approx. 240g", imageUrl: "https://images.unsplash.com/photo-1514756331096-242f20484696?auto=format&fit=crop&w=400" },
  { name: "Peaches Yellow", price: 0.59, size: "approx. 120g", imageUrl: "https://images.unsplash.com/photo-1605197585662-588b39418b76?auto=format&fit=crop&w=400" },
  { name: "Rockmelon Whole", price: 3.50, size: "1 Each", imageUrl: "https://images.unsplash.com/photo-1571575173772-bb32ec5e8b7f?auto=format&fit=crop&w=400" },
  { name: "Papaya Loose", price: 4.50, size: "1 each", imageUrl: "https://images.unsplash.com/photo-1517260739337-6799d2df8a21?auto=format&fit=crop&w=400" },
  { name: "Pomegranate Medium", price: 5.50, size: "1 each", imageUrl: "https://images.unsplash.com/photo-1518386407426-191c0a59b67f?auto=format&fit=crop&w=400" },
];

export const COLES_SEAFOOD_DATABASE = [
  { name: "Tasmanian Salmon Portions Skin On 4 Pack", price: 17.50, size: "460g", imageUrl: "https://images.unsplash.com/photo-1599084993091-1e811e2f3a69?auto=format&fit=crop&w=400" },
  { name: "Tasmanian Salmon Portions Skin Off 4 Pack", price: 19.00, size: "460g", imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400" },
  { name: "Deli Thawed Australian Cooked Black Tiger Prawns Extra Large", price: 9.75, size: "approx. 250g", imageUrl: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=400" },
  { name: "Deli Fresh Tasmanian Salmon Portions Skin On", price: 6.80, size: "approx. 200g", imageUrl: "https://images.unsplash.com/photo-1599084993091-1e811e2f3a69?auto=format&fit=crop&w=400" },
  { name: "Deli Australian Thawed Raw Extra Large Black Tiger Prawns", price: 6.50, size: "approx. 250g", imageUrl: "https://images.unsplash.com/photo-1559058789-672da06263d8?auto=format&fit=crop&w=400" },
  { name: "Deli Thawed Basa Fillets", price: 1.80, size: "approx. 200g", imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400" },
  { name: "Deli Thawed Barramundi Fillets", price: 6.30, size: "approx. 350g", imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400" },
  { name: "Prawns Raw Peeled", price: 12.50, size: "260g", imageUrl: "https://images.unsplash.com/photo-1623962520499-03f9808f1c99?auto=format&fit=crop&w=400" },
  { name: "Cooked Prawns With Cocktail Sauce", price: 11.00, size: "260g", imageUrl: "https://images.unsplash.com/photo-1625944525533-4c2cbc887d50?auto=format&fit=crop&w=400" },
  { name: "Mussels In Oil", price: 1.70, size: "85g", imageUrl: "https://images.unsplash.com/photo-1613564834361-9436948817d1?auto=format&fit=crop&w=400" },
  { name: "Seafood Sauce", price: 2.50, size: "230g", imageUrl: "https://images.unsplash.com/photo-1607532941433-304659e8198a?auto=format&fit=crop&w=400" },
  { name: "Finest Double Smoked Salmon", price: 11.00, size: "150g", imageUrl: "https://images.unsplash.com/photo-1585672840545-d8f9947814b1?auto=format&fit=crop&w=400" },
  { name: "Tasmanian Salmon Marinated Portions Teriyaki", price: 16.00, size: "325g", imageUrl: "https://images.unsplash.com/photo-1467003909585-2f8a7270028d?auto=format&fit=crop&w=400" },
];

export const COLES_BAKERY_DATABASE = [
  { name: "Finest Brown Butter & Jamaican Rum Fruit Mince Pies", price: 7.50, size: "350g", brand: "Coles", imageUrl: "https://images.unsplash.com/photo-1607478900766-efe13248b125?auto=format&fit=crop&w=400" },
  { name: "Golden Crumpet Square 6 Pack", price: 5.00, size: "425g", brand: "Golden", imageUrl: "https://images.unsplash.com/photo-1626127117565-d60a5d4d3d2c?auto=format&fit=crop&w=400" },
  { name: "Tip Top Muffins English Original", price: 6.40, size: "400g", brand: "Tip Top", imageUrl: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=400" },
  { name: "Tip Top Gourmet Bun 4 Pack", price: 4.70, size: "220g", brand: "Tip Top", imageUrl: "https://images.unsplash.com/photo-1557022272-3c8c7d81216d?auto=format&fit=crop&w=400" },
  { name: "Slice X Chupa Balls Strawberry & Cream", price: 6.00, size: "160g", brand: "Slice", imageUrl: "https://images.unsplash.com/photo-1598268121084-c3c7c8e5f324?auto=format&fit=crop&w=400" },
  { name: "Bakery Sponge Roll Mini Choc 6 Pack", price: 4.00, size: "250g", brand: "Coles", imageUrl: "https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&w=400" },
  { name: "Bakery Vegemite Scroll", price: 2.75, size: "1 Each", brand: "Coles", imageUrl: "https://images.unsplash.com/photo-1617065977533-3164a2f87a8b?auto=format&fit=crop&w=400" },
  { name: "Bakery Stonebaked White Sourdough Vienna", price: 4.50, size: "1 Each", brand: "Coles", imageUrl: "https://images.unsplash.com/photo-1585478259715-876ac5d8d35a?auto=format&fit=crop&w=400" },
  { name: "Iced Donuts", price: 3.25, size: "6 pack", brand: "Coles", imageUrl: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=400" },
  { name: "Bakery Indulgent Choc 40% Choc Chip Cookie", price: 3.00, size: "6 Pack", brand: "Coles", imageUrl: "https://images.unsplash.com/photo-1499636138143-bd649043ce52?auto=format&fit=crop&w=400" },
  { name: "Bakery Hawaiian Pizza Roll", price: 3.50, size: "2 pack", brand: "Coles", imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400" },
];

export const COLES_DAIRY_DATABASE = [
  { name: "Pauls Custard Vanilla", price: 5.20, size: "1kg", brand: "Pauls", imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=400" },
  { name: "The Organic Milk Co Organic Mozzarella Shred", price: 6.00, size: "250g", brand: "The Organic Milk Co", imageUrl: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=400" },
  { name: "Riverina Haloumi", price: 5.80, size: "180g", brand: "Riverina", imageUrl: "https://images.unsplash.com/photo-1624806992098-1971788e5d95?auto=format&fit=crop&w=400" },
  { name: "Primo Reserve Cheese Kransky", price: 4.90, size: "250g", brand: "Primo", imageUrl: "https://images.unsplash.com/photo-1595486025265-27a3d3c73708?auto=format&fit=crop&w=400" },
  { name: "Devondale Regular Butter Blend", price: 7.50, size: "500g", brand: "Devondale", imageUrl: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=400" },
  { name: "Primo Reserve Ham Off The Bone Sliced Deli Meat", price: 5.50, size: "100g", brand: "Primo", imageUrl: "https://images.unsplash.com/photo-1524182576066-10905c55c5fc?auto=format&fit=crop&w=400" },
  { name: "Arla Protein Pudding Chocolate", price: 3.00, size: "200g", brand: "Arla", imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400" },
  { name: "Siggi's Yoghurt Pouch Strawberry", price: 1.35, size: "150g", brand: "Siggi's", imageUrl: "https://images.unsplash.com/photo-1571212515416-f22354cbaf75?auto=format&fit=crop&w=400" },
  { name: "Surf Coast Cracking Good Ultimate Free Range Eggs 12 Pack", price: 7.00, size: "700g", brand: "Surf Coast", imageUrl: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=400" },
  { name: "Yumi's Traditional Hommus Dip Dairy & Gluten Free", price: 4.50, size: "200g", brand: "Yumi's", imageUrl: "https://images.unsplash.com/photo-1630409346824-4f0e7b04313d?auto=format&fit=crop&w=400" },
  { name: "Provedore Prosciutto", price: 7.50, size: "100g", brand: "Provedore", imageUrl: "https://images.unsplash.com/photo-1529563021893-cc83c992d75e?auto=format&fit=crop&w=400" },
  { name: "Divine Classic Creme Caramel Dessert 2 pack", price: 4.00, size: "150g", brand: "Divine", imageUrl: "https://images.unsplash.com/photo-1517424619713-1b9138407981?auto=format&fit=crop&w=400" },
  { name: "Black Swan Tzatziki Dip", price: 4.50, size: "200g", brand: "Black Swan", imageUrl: "https://images.unsplash.com/photo-1634747997637-29013c77d61b?auto=format&fit=crop&w=400" },
];

// Helper to get reliable placeholders
const getCategoryPlaceholder = (category: string) => {
  switch (category) {
    case 'Vegetables': return 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=400';
    case 'Meat': return 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=400';
    case 'Seafood': return 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=400';
    case 'Fruits': return 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=400';
    case 'Bakery': return 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400';
    case 'Dairy': return 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=400';
    default: return 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400';
  }
};

// Helper to generate consistent mock products
export const generateMockProduct = (ingredientName: string): Product => {
  const rand = Math.random();
  const lowerName = ingredientName.toLowerCase();
  
  // 1. Check if it's a vegetable in our Real Data (Coles)
  const vegMatch = COLES_VEGETABLES_DATABASE.find(item => {
    const itemName = item.name.toLowerCase();
    return itemName.includes(lowerName) || lowerName.includes(itemName.replace("coles", "").trim());
  });

  if (vegMatch) {
    let matchType: Product['matchType'] = 'Exact match';
    if (Math.random() > 0.8) matchType = 'Best Price';

    const calories = Math.floor(Math.random() * 80) + 15;
    const dietaryTypes: string[] = ['Vegan'];
    if (vegMatch.name.toLowerCase().includes('organic')) dietaryTypes.push('Organic');

    return {
      id: `coles-${Math.random().toString(36).substr(2, 6)}`,
      name: vegMatch.name,
      brand: 'Fresh Market',
      price: vegMatch.price,
      imageUrl: vegMatch.imageUrl,
      matchType: matchType,
      weight: vegMatch.size,
      category: 'Vegetables',
      calories: calories,
      nutrition: {
        protein: `${(Math.random() * 2).toFixed(1)}g`,
        carbs: `${(Math.random() * 10).toFixed(1)}g`,
        fat: `${(Math.random() * 0.5).toFixed(1)}g`,
        fiber: `${(Math.random() * 4).toFixed(1)}g`
      },
      pricePerUnit: `per ${vegMatch.size}`,
      allergens: [],
      dietaryType: dietaryTypes
    };
  }
  
  // 2. Check if it is Meat
   const meatMatch = COLES_MEAT_DATABASE.find(item => {
    const itemName = item.name.toLowerCase();
    return itemName.includes(lowerName) || lowerName.includes(itemName.replace("beef", "").trim());
  });

  if (meatMatch) {
     return {
      id: `coles-meat-${Math.random().toString(36).substr(2, 6)}`,
      name: meatMatch.name,
      brand: 'Coles Graze',
      price: meatMatch.price,
      imageUrl: meatMatch.imageUrl,
      matchType: 'Exact match',
      weight: meatMatch.size,
      category: 'Meat',
      calories: 250,
      nutrition: {
        protein: '25g',
        carbs: '0g',
        fat: '18g',
        fiber: '0g'
      },
      pricePerUnit: `per ${meatMatch.size}`,
      allergens: [],
      dietaryType: ['Gluten-Free']
    };
  }

  // 3. Check if it is Fruit
   const fruitMatch = COLES_FRUITS_DATABASE.find(item => {
    const itemName = item.name.toLowerCase();
    return itemName.includes(lowerName) || lowerName.includes(itemName.replace("apple", "").trim());
  });

  if (fruitMatch) {
     return {
      id: `coles-fruit-${Math.random().toString(36).substr(2, 6)}`,
      name: fruitMatch.name,
      brand: 'Fresh Orchard',
      price: fruitMatch.price,
      imageUrl: fruitMatch.imageUrl,
      matchType: 'Exact match',
      weight: fruitMatch.size,
      category: 'Fruits',
      calories: Math.floor(Math.random() * 60) + 40,
      nutrition: {
        protein: `${(Math.random() * 1).toFixed(1)}g`,
        carbs: `${(Math.random() * 15 + 5).toFixed(1)}g`,
        fat: '0.2g',
        fiber: `${(Math.random() * 3 + 1).toFixed(1)}g`
      },
      pricePerUnit: `per ${fruitMatch.size}`,
      allergens: [],
      dietaryType: ['Vegan', 'Organic']
    };
  }

  // 4. Check if it is Seafood
  const seafoodMatch = COLES_SEAFOOD_DATABASE.find(item => {
    const itemName = item.name.toLowerCase();
    return itemName.includes(lowerName) || lowerName.includes(itemName.replace("salmon", "").replace("prawns", "").trim());
  });

  if (seafoodMatch) {
     return {
      id: `coles-seafood-${Math.random().toString(36).substr(2, 6)}`,
      name: seafoodMatch.name,
      brand: 'Ocean Catch',
      price: seafoodMatch.price,
      imageUrl: seafoodMatch.imageUrl,
      matchType: 'Exact match',
      weight: seafoodMatch.size,
      category: 'Seafood',
      calories: Math.floor(Math.random() * 150) + 80,
      nutrition: {
        protein: `${(Math.random() * 15 + 15).toFixed(1)}g`,
        carbs: '0g',
        fat: `${(Math.random() * 10).toFixed(1)}g`,
        fiber: '0g'
      },
      pricePerUnit: `per ${seafoodMatch.size}`,
      allergens: ['Seafood', 'Shellfish'],
      dietaryType: ['Gluten-Free', 'Pescatarian']
    };
  }

  // 5. Check if it is Bakery
  const bakeryMatch = COLES_BAKERY_DATABASE.find(item => {
    const itemName = item.name.toLowerCase();
    return itemName.includes(lowerName) || lowerName.includes(itemName.replace("bread", "").replace("cake", "").trim());
  });

  if (bakeryMatch) {
     return {
      id: `coles-bakery-${Math.random().toString(36).substr(2, 6)}`,
      name: bakeryMatch.name,
      brand: bakeryMatch.brand,
      price: bakeryMatch.price,
      imageUrl: bakeryMatch.imageUrl,
      matchType: 'Exact match',
      weight: bakeryMatch.size,
      category: 'Bakery',
      calories: Math.floor(Math.random() * 300) + 150,
      nutrition: {
        protein: `${(Math.random() * 5 + 2).toFixed(1)}g`,
        carbs: `${(Math.random() * 30 + 20).toFixed(1)}g`,
        fat: `${(Math.random() * 10 + 2).toFixed(1)}g`,
        fiber: `${(Math.random() * 2).toFixed(1)}g`
      },
      pricePerUnit: `per ${bakeryMatch.size}`,
      allergens: ['Gluten', 'Eggs', 'Milk'],
      dietaryType: ['Vegetarian']
    };
  }

  // 6. Check if it is Dairy
  const dairyMatch = COLES_DAIRY_DATABASE.find(item => {
    const itemName = item.name.toLowerCase();
    return itemName.includes(lowerName) || lowerName.includes(itemName.replace("milk", "").replace("cheese", "").replace("yoghurt", "").trim());
  });

  if (dairyMatch) {
     return {
      id: `coles-dairy-${Math.random().toString(36).substr(2, 6)}`,
      name: dairyMatch.name,
      brand: dairyMatch.brand,
      price: dairyMatch.price,
      imageUrl: dairyMatch.imageUrl,
      matchType: 'Exact match',
      weight: dairyMatch.size,
      category: 'Dairy',
      calories: Math.floor(Math.random() * 200) + 50,
      nutrition: {
        protein: `${(Math.random() * 10 + 2).toFixed(1)}g`,
        carbs: `${(Math.random() * 10 + 2).toFixed(1)}g`,
        fat: `${(Math.random() * 10 + 2).toFixed(1)}g`,
        fiber: `0g`
      },
      pricePerUnit: `per ${dairyMatch.size}`,
      allergens: ['Milk'],
      dietaryType: ['Vegetarian', 'Gluten-Free']
    };
  }

  // 7. Fallback with Smart Categories
  let matchType: Product['matchType'];
  
  if (rand < 0.4) matchType = 'Exact match';
  else if (rand < 0.6) matchType = 'Similar item';
  else if (rand < 0.8) matchType = 'Best Price';
  else matchType = 'Premium product';

  const price = (Math.random() * 10 + 2).toFixed(2);
  
  const possibleAllergens = ['Nuts', 'Dairy', 'Gluten', 'Soy'];
  const allergens = [];
  if (Math.random() > 0.8) allergens.push(possibleAllergens[Math.floor(Math.random() * possibleAllergens.length)]);
  
  const dietaryTypes = ['Organic', 'Halal'];
  if (Math.random() > 0.5) dietaryTypes.push('Vegan');
  if (Math.random() > 0.7) dietaryTypes.push('Keto');

  let category = 'Pantry';
  if (lowerName.match(/chicken|meat|beef|pork|steak|lamb/)) category = 'Meat';
  else if (lowerName.match(/fish|shrimp|salmon|seafood/)) category = 'Seafood';
  else if (lowerName.match(/apple|banana|orange|lemon|fruit|berry|grape|mango|pear/)) category = 'Fruits';
  else if (lowerName.match(/carrot|lettuce|onion|vegetable|potato|tomato/)) category = 'Vegetables';
  else if (lowerName.match(/milk|cheese|yogurt|butter|cream/)) category = 'Dairy';
  else if (lowerName.match(/bread|cake|muffin|roll|pie|biscuit/)) category = 'Bakery';

  const imageUrl = getCategoryPlaceholder(category);

  return {
    id: Math.random().toString(36).substr(2, 9),
    name: matchType === 'Exact match' ? `Organic ${ingredientName}` : `${ingredientName} Alternative`,
    brand: 'MarketChoice',
    price: parseFloat(price),
    imageUrl: imageUrl, // Use the smart placeholder
    matchType: matchType,
    weight: '500g',
    category,
    calories: Math.floor(Math.random() * 400) + 50,
    nutrition: {
      protein: `${Math.floor(Math.random() * 30)}g`,
      carbs: `${Math.floor(Math.random() * 50)}g`,
      fat: `${Math.floor(Math.random() * 20)}g`,
      fiber: `${Math.floor(Math.random() * 10)}g`
    },
    pricePerUnit: `$${(parseFloat(price) / 5).toFixed(2)}/100g`,
    allergens,
    dietaryType: dietaryTypes
  };
};

const MOCK_ITEMS_1 = [
  {
    id: 'i1',
    quantity: 1,
    ingredient: { name: 'Chicken' },
    product: { 
      id: 'p1', 
      name: 'Organic Chicken Breast', 
      brand: 'FarmFresh', 
      price: 12.50, 
      imageUrl: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=400', 
      matchType: 'Exact match', 
      weight: '500g',
      category: 'Meat',
      calories: 165,
      nutrition: { protein: '31g', carbs: '0g', fat: '3.6g' },
      pricePerUnit: '$2.50/100g',
      dietaryType: ['Organic', 'Halal']
    }
  },
  {
    id: 'i2',
    quantity: 2,
    ingredient: { name: 'Lemon' },
    product: { 
      id: 'p2', 
      name: 'Fresh Lemon', 
      brand: 'Nature', 
      price: 0.80, 
      imageUrl: 'https://images.unsplash.com/photo-1595855709915-f761a2517830?auto=format&fit=crop&w=400', 
      matchType: 'Exact match', 
      weight: '1pc',
      category: 'Fruits',
      calories: 29,
      nutrition: { protein: '1.1g', carbs: '9g', fat: '0.3g' },
      pricePerUnit: '$0.80/pc',
      dietaryType: ['Organic', 'Vegan']
    }
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-7782',
    date: 'Oct 24, 2023',
    total: 14.10,
    status: 'Delivered',
    items: MOCK_ITEMS_1 as any, 
  },
  {
    id: 'ORD-9921',
    date: 'Nov 02, 2023',
    total: 45.00,
    status: 'Delivered',
    items: MOCK_ITEMS_1 as any, 
  }
];
