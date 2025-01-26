import {
    collection,
    getDocs,
    setDoc,
    updateDoc,
    query,
    where,
    onSnapshot,
    addDoc,
    doc,
    deleteDoc, // Include deleteDoc here
} from "firebase/firestore";
import { db } from "../firebase/firebase";

// Fetch goals in real-time
export const fetchGoalsRealTime = (userId, callback) => {
    const goalsRef = collection(db, "users", userId, "goals");
    return onSnapshot(goalsRef, (snapshot) => {
        const goals = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        callback(goals);
    });
};

// Update goal progress
export const updateGoalProgress = async (userId, goalId, progress) => {
    const goalRef = doc(db, "users", userId, "goals", goalId);
    await updateDoc(goalRef, { progress });
};

// Add a friend or family member
export const addFriendOrFamily = async (userId, friendId, friendName, relationship) => {
    const friendRef = doc(db, "users", userId, "friendsAndFamily", friendId);
    await setDoc(friendRef, { name: friendName, relationship });
};

// Fetch friends and family in real-time
export const fetchFriendsAndFamilyRealTime = (userId, callback) => {
    const friendsRef = collection(db, "users", userId, "friendsAndFamily");
    return onSnapshot(friendsRef, (snapshot) => {
        const friends = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        callback(friends);
    });
};

// Fetch user details by email
export const fetchUserByEmail = async (email) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        return { id: userDoc.id, ...userDoc.data() };
    }
    throw new Error("User with this email not found in the database.");
};

// Add a new weekly goal
export const addWeeklyGoal = async (userId, goalName) => {
    const goalsRef = collection(db, "users", userId, "goals");
    return addDoc(goalsRef, {
        name: goalName,
        progress: 0,
        target: 100,
        sharedWith: [], // List of friend/family IDs
    });
};

// Share a goal with a friend or family
export const shareGoalWithUser = async (userId, goalId, friendId) => {
    const goalRef = doc(db, "users", userId, "goals", goalId);
    const goalSnap = await getDocs(goalRef);
    if (goalSnap.exists()) {
        const currentSharedWith = goalSnap.data().sharedWith || [];
        await updateDoc(goalRef, {
            sharedWith: [...currentSharedWith, friendId],
        });
    }
};

// Delete a goal
export const deleteGoal = async (userId, goalId) => {
    const goalRef = doc(db, "users", userId, "goals", goalId);
    await deleteDoc(goalRef);
};
