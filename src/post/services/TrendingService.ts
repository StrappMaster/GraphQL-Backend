
const passesTrendingThreshold = (universityName?: String) => {
    const threshold = (universityName == "university_of_michigan") ? 40 :
        (universityName == "michigan_state") ? 50 :
            (universityName == "university_of_toronto") ? 20 : 40;
    return ({ "$expr": {"$gt": [
                            {
                                "$add" : [
                                    { "$ifNull": [ { "$multiply" : ["$fake_likes", 2] }, 0]},
                                    {"$subtract": [
                                        { "$multiply" : [{"$size": "$likes"}, 2] },
                                        {"$size": "$dislikes"}
                                    ]},
                                    { "$multiply": [{"$size": "$comments"}, 2] },
                                ],
                            },
                            threshold
                        ] }});
    }

export default passesTrendingThreshold;
