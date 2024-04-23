const faker = require('faker');

const generatePropertyData = () => {
  const properties = [];
  for (let i = 0; i < 20; i++) {
    const singleFamily = {
      id: faker.datatype.uuid(),
      type: 'Single Family',
      location: faker.address.streetAddress(),
      price: `$${faker.finance.amount(100000, 500000, 0)}`,
      beds: faker.datatype.number({ min: 2, max: 5 }),
      baths: faker.datatype.number({ min: 1, max: 3 }),
      livingArea: `${faker.datatype.number({ min: 1500, max: 3500 })} sq ft`,
      lotArea: `${faker.datatype.number({ min: 5000, max: 15000 })} sq ft`,
      agent: {
        name: faker.name.findName(),
        phone: faker.phone.phoneNumber(),
      },
    };

    const units = [];
    let totalLivingArea = 0;
    let totalBeds = 0;
    let totalBaths = 0;
    
    for (let j = 0; j < 2; j++) {
      const unit = {
        location: faker.address.streetAddress(),
        price: `$${faker.finance.amount(100000, 300000, 0)}`,
        beds: faker.datatype.number({ min: 1, max: 3 }),
        baths: faker.datatype.number({ min: 1, max: 2 }),
        unitArea: faker.datatype.number({ min: 500, max: 1500 })
      };
      totalLivingArea += unit.unitArea;
      totalBeds += unit.beds;
      totalBaths += unit.baths;
      units.push(unit);
    }

    const multiFamily = {
      id: faker.datatype.uuid(),
      type: 'Multi-Family',
      location: faker.address.streetAddress(),
      price: `$${faker.finance.amount(200000, 700000, 0)}`,
      units: units,
      totalLivingArea: `${totalLivingArea} sq ft`,
      totalBeds: totalBeds,
      totalBaths: totalBaths,
      agent: {
        name: faker.name.findName(),
        phone: faker.phone.phoneNumber(),
      },
    };
    properties.push(singleFamily, multiFamily);
  }
  return properties;
};

const properties = generatePropertyData();
console.log(JSON.stringify(properties, null, 2));
