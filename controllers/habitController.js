// import Habit from "../models/Habit.js";
// import HabitLog from "../models/HabitLog.js";

// export const getHabits = async (req, res) => {
//     try {
//         const {includeArchived} = req.query;
//         const filter = {userId: req.user.id};
//     if (includeArchived!== 'true') filter.archived = false;
//     const habits = await Habit.find(filter).sort({order: 1, createdAt: 1});
//     res.json(habits);
//     }
//     catch (err) {
//         res.status(500).json({message: err.message});
//     }
// };

// export const createHabit = async (req, res) => {
//     try {
//         const {
//             name,
//             description,
//             category,
//             frequency,
//             targetDays,
//             color,
//             icon,
//         } = req.body;
//         if(!name) return res.status(400).json({message: "Habit Name is required"});

//         const count = await Habit.countDocuments({userId: req.user.id});

//         const habit = await Habit.create({
//             userId: req.user.id,
//             name,
//             description,
//             category,
//             frequency,
//             targetDays,
//             color,
//             icon,
//             order: count,
//         });
//         res.status(201).json(habit);
//     }
//     catch (err) {
//         res.status(500).json({message: err.message});
//     }
// };

// export const updateHabit = async (req, res) => {
//     try {
//         const habit = await Habit.findOne({
//             _id: req.params.id,
//             userId: req.user.id,
//         });
//         if (!habit) return res.status(404).json({message: "Habit not found"});
//         const fields = [
//             "name",
//             "description",
//             "category",
//             "frequency",
//             "targetDays",
//             "color",
//             "icon",
//             "order",
//         ];
//         for(const f of fields) {
//             if (req.body[f] !== undefined) habit[f] = req.body[f];
//         }
//         await habit.save();
//         res.json(habit);
//     }
//     catch (err) {
//         res.status(500).json({message: err.message});
//     }
// };

// export const deleteHabit = async (req, res) => {
//     try {
//         const habit = await Habit.findOneAndDelete({
//             _id: req.params.id,
//             userId: req.user.id,
//         });
//         if (!habit) return res.status(404).json({message: "Habit not found"});
//         await HabitLog.deleteMany({habitId: habit._id, userId: req.user.id});
//         res.json({message: "Habit deleted"});
//     }
//     catch (err) {
//         res.status(500).json({message: err.message});
//     }
// };

// export const archiveHabit = async (req, res) => {
//     try {
//         const habit = await Habit.findOne({
//             _id: req.params.id,
//             userId: req.user.id,
//         });
//         if (!habit) return res.status(404).json({message: "Habit not found"});
//         habit.archived = !habit.archived;
//         await habit.save();
//         res.json(habit);
//     } 
//     catch (err) {
//         res.status(500).json({message: err.message});
//     }
// };

// export const reorderHabits = async (req, res) => {
//     try {
//         const {order} = req.body;
//         if (!Array.isArray(order)) return res.status(400).json({message: "Order must be an array"});
//         await Promise.all(
//             order.map((id, index) =>
//                 Habit.findOneAndUpdate(
//                     {_id: id, userId: req.user.id},
//                     {$set: {order: index}}
//                 )
//             )
//         );
//         res.json({message: "Reordered"});
//     }
//     catch (err) {
//         res.status(500).json({message: err.message});
//     }
// };
import Habit from "../models/Habit.js";
import HabitLog from "../models/HabitLog.js";

// Get all habits
export const getHabits = async (req, res) => {
  try {
    const { includeArchived } = req.query;
    const filter = { userId: req.user._id };

    if (includeArchived !== "true") filter.isArchived = false;

    const habits = await Habit.find(filter).sort({ order: 1, createdAt: 1 });
    res.json(habits);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new habit
export const createHabit = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      frequency,
      targetDays,
      color,
      icon,
    } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Habit Name is required" });
    }

    const count = await Habit.countDocuments({ userId: req.user._id });

    const habit = await Habit.create({
      userId: req.user._id,
      name,
      description,
      category,
      frequency,
      targetDays,
      color,
      icon,
      order: count,
    });

    res.status(201).json(habit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update habit
export const updateHabit = async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    const fields = [
      "name",
      "description",
      "category",
      "frequency",
      "targetDays",
      "color",
      "icon",
      "order",
    ];

    for (const f of fields) {
      if (req.body[f] !== undefined) habit[f] = req.body[f];
    }

    await habit.save();
    res.json(habit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete habit
export const deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    await HabitLog.deleteMany({ habitId: habit._id, userId: req.user._id });
    res.json({ message: "Habit deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Archive / Unarchive habit
export const archiveHabit = async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    habit.isArchived = !habit.isArchived;
    await habit.save();

    res.json(habit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Reorder habits
export const reorderHabits = async (req, res) => {
  try {
    const { order } = req.body;

    if (!Array.isArray(order)) {
      return res.status(400).json({ message: "Order must be an array" });
    }

    await Promise.all(
      order.map((id, index) =>
        Habit.findOneAndUpdate(
          { _id: id, userId: req.user._id },
          { $set: { order: index } }
        )
      )
    );

    res.json({ message: "Reordered" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
