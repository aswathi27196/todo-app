db.sales.aggregate([
    // Step 1: Flatten each item in the items array
    {
      $unwind: "$items"
    },
    // Step 2: Add month and revenue fields
    {
      $addFields: {
        month: { $dateToString: { format: "%Y-%m", date: "$date" } },
        itemRevenue: { $multiply: ["$items.quantity", "$items.price"] }
      }
    },
    // Step 3: Group by store and month
    {
      $group: {
        _id: {
          store: "$store",
          month: "$month"
        },
        totalRevenue: { $sum: "$itemRevenue" },
        totalItemPrices: { $sum: "$items.price" },
        itemCount: { $sum: 1 }
      }
    },
    // Step 4: Project final result with averagePrice
    {
      $project: {
        _id: 0,
        store: "$_id.store",
        month: "$_id.month",
        totalRevenue: 1,
        averagePrice: {
          $round: [{ $divide: ["$totalItemPrices", "$itemCount"] }, 2]
        }
      }
    },
    // Step 5: Sort by store and then by month
    {
      $sort: {
        store: 1,
        month: 1
      }
    }
  ]);
  