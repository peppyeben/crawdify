// Mapping error signatures to more readable messages
const errorMessages: any = {
    "AlreadyMember": "You are already a member of this campaign.",
    "AddressExistsAsMember": "This address is already registered as a member.",
    "NotAMember": "You are not recognized as a member. Proceed to Profile Page",
    "AmountCannotBeZero": "The amount cannot be zero. Please enter a valid amount.",
    "InvalidDate": "The provided date is invalid.",
    "InvalidCampaignID": "The campaign ID provided is not valid.",
    "NoValidCampaigns": "There are no valid campaigns available.",
    "CampaignOwner": "You are the owner of this campaign and cannot perform this action.",
    "NotCampaignOwner": "Only the campaign owner can perform this action.",
    "CampaignEnded": "The campaign has already ended.",
    "CampaignNotEnded": "The campaign is still active and cannot be closed yet.",
    "CampaignGoalReached": "The campaign has already reached its goal.",
    "CampaignPaused": "The campaign is currently paused.",
    "NoCampaignForAddress": "There is no campaign associated with this address.",
    "ThiefDeyYourEye": "Suspicious behavior detected! Action not allowed.",
    "InvalidAmount": "The amount you entered is invalid.",
    "WithdrawFailed": "Failed to withdraw funds. Please try again.",
    "NotADonor": "Only donors are allowed to perform this action.",
};

// Function to parse the contract error and display a readable message
export const  parseContractError = (error: any) => {
    const errorString = error.message || error.toString();
    
    // Extract the error name from the message (e.g. "CampaignOwner()")
    const matchedError = errorString.match(/\b[A-Za-z]+\(\)/);
    
    if (matchedError) {
        const errorName = matchedError[0].replace("()", ""); // Remove the "()" from the error name
        
        // Check if the error name exists in the custom error mapping
        if (errorMessages[errorName]) {
            return errorMessages[errorName];
        }
    }
    
    // Fallback to the original error message if no match found
    return "An unknown error occurred. Please try again.";
}
