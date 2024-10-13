export const abi = [
    {
        inputs: [
            {
                internalType: "bytes",
                name: "adminProfileDetailsHash",
                type: "bytes",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [],
        name: "AlreadyMember",
        type: "error",
    },
    {
        inputs: [],
        name: "AmountCannotBeZero",
        type: "error",
    },
    {
        inputs: [],
        name: "CampaignEnded",
        type: "error",
    },
    {
        inputs: [],
        name: "CampaignGoalReached",
        type: "error",
    },
    {
        inputs: [],
        name: "CampaignNotEnded",
        type: "error",
    },
    {
        inputs: [],
        name: "CampaignOwner",
        type: "error",
    },
    {
        inputs: [],
        name: "CampaignPaused",
        type: "error",
    },
    {
        inputs: [],
        name: "InvalidAmount",
        type: "error",
    },
    {
        inputs: [],
        name: "InvalidCampaignID",
        type: "error",
    },
    {
        inputs: [],
        name: "NoCampaignForAddress",
        type: "error",
    },
    {
        inputs: [],
        name: "NoValidCampaigns",
        type: "error",
    },
    {
        inputs: [],
        name: "NotADonor",
        type: "error",
    },
    {
        inputs: [],
        name: "NotAMember",
        type: "error",
    },
    {
        inputs: [],
        name: "NotCampaignOwner",
        type: "error",
    },
    {
        inputs: [],
        name: "ReentrancyGuardReentrantCall",
        type: "error",
    },
    {
        inputs: [],
        name: "ThiefDeyYourEye",
        type: "error",
    },
    {
        inputs: [],
        name: "WithdrawFailed",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "amountWithdrawn",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "address",
                name: "profileOwner",
                type: "address",
            },
        ],
        name: "BalanceWithdrawal",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "dateCreated",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "address",
                name: "projectOwner",
                type: "address",
            },
        ],
        name: "CampaignCreated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "timeClaimed",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "address",
                name: "claimedBy",
                type: "address",
            },
        ],
        name: "CampaignFundClaimed",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "amountDonated",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "address",
                name: "projectDonor",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "projectOwner",
                type: "address",
            },
        ],
        name: "CampaignFunded",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "datePaused",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "address",
                name: "projectOwner",
                type: "address",
            },
        ],
        name: "CampaignPaused",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "timeRefunded",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "address",
                name: "donor",
                type: "address",
            },
        ],
        name: "DonationRefunded",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "dateCreated",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "address",
                name: "profile",
                type: "address",
            },
        ],
        name: "ProfileCreated",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_creator",
                type: "address",
            },
            {
                internalType: "address",
                name: "_projectDonor",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_projectID",
                type: "uint256",
            },
        ],
        name: "checkRefundStatus",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_creator",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_id",
                type: "uint256",
            },
        ],
        name: "claimCampaignFunds",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_endDate",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_projectAmount",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "_details",
                type: "bytes",
            },
        ],
        name: "createCampaign",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "_profileDetailsHash",
                type: "bytes",
            },
        ],
        name: "createProfile",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_creator",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_id",
                type: "uint256",
            },
        ],
        name: "endCampaign",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_creator",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_id",
                type: "uint256",
            },
        ],
        name: "fundCampaign",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_creator",
                type: "address",
            },
            {
                internalType: "address",
                name: "_projectDonor",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_projectID",
                type: "uint256",
            },
        ],
        name: "getAmountDonatedToCampaign",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_addr",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_id",
                type: "uint256",
            },
        ],
        name: "getCampaign",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "id",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "dateCreated",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "endDate",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "projectGoal",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "projectAmountRaised",
                        type: "uint256",
                    },
                    {
                        internalType: "enum Campaign.CampaignStatus",
                        name: "status",
                        type: "uint8",
                    },
                    {
                        internalType: "bool",
                        name: "isClaimedByAdmin",
                        type: "bool",
                    },
                    {
                        internalType: "bytes",
                        name: "projectDetailsHash",
                        type: "bytes",
                    },
                    {
                        internalType: "address",
                        name: "creator",
                        type: "address",
                    },
                    {
                        components: [
                            {
                                internalType: "address",
                                name: "_addr",
                                type: "address",
                            },
                            {
                                internalType: "uint256",
                                name: "_amount",
                                type: "uint256",
                            },
                        ],
                        internalType: "struct Campaign.Donor[]",
                        name: "donors",
                        type: "tuple[]",
                    },
                ],
                internalType: "struct Campaign.NewCampaign_",
                name: "_theCampaign",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_addr",
                type: "address",
            },
        ],
        name: "getCampaigns",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "id",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "dateCreated",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "endDate",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "projectGoal",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "projectAmountRaised",
                        type: "uint256",
                    },
                    {
                        internalType: "enum Campaign.CampaignStatus",
                        name: "status",
                        type: "uint8",
                    },
                    {
                        internalType: "bool",
                        name: "isClaimedByAdmin",
                        type: "bool",
                    },
                    {
                        internalType: "bytes",
                        name: "projectDetailsHash",
                        type: "bytes",
                    },
                    {
                        internalType: "address",
                        name: "creator",
                        type: "address",
                    },
                    {
                        components: [
                            {
                                internalType: "address",
                                name: "_addr",
                                type: "address",
                            },
                            {
                                internalType: "uint256",
                                name: "_amount",
                                type: "uint256",
                            },
                        ],
                        internalType: "struct Campaign.Donor[]",
                        name: "donors",
                        type: "tuple[]",
                    },
                ],
                internalType: "struct Campaign.NewCampaign_[]",
                name: "_theCampaigns",
                type: "tuple[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getProfile",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "noOfCampaignsFunded",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "noOfCampaignsCreated",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "totalAmountDonated",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "dateCreated",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "profileBalance",
                        type: "uint256",
                    },
                    {
                        internalType: "address payable",
                        name: "profileOwner",
                        type: "address",
                    },
                    {
                        internalType: "bytes",
                        name: "profileDetailsHash",
                        type: "bytes",
                    },
                ],
                internalType: "struct Profile.NewProfile",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_creator",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_id",
                type: "uint256",
            },
        ],
        name: "getRefundFromCampaign",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_creator",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_id",
                type: "uint256",
            },
        ],
        name: "pauseCampaign",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "withdrawFunds",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
] as const;
