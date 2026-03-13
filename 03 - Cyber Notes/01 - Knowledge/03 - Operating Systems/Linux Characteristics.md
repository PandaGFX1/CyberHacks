Tags: #OS #Terminology

Refer to: [[00 - Linux Index]]

UNIX Operating System 

UNIX -  

Kernel – The hub of the operating system. Allocates time and memory to programs and handles the filestore and communications in response to system calls. 

The Shell – Acts as an interface between the user and the kernel. The shell is a command line interpreter (CLI). It interprets commands. 

Applications – Apps and programs run by the user or system 

Terminal 

**Takes place of the CLI found in Windows** 

Shell Types 

Bourne Shell (sh) 

Tenex C Shell (tcsh) 

C Shell (csh) 

Bourne-Again Shell (bash) - Default shell for Linux (CentOS) 

Echo $SHELL – Can be used to show what shell you are currently using 

Unix Commands 

UNIX Commands and Files are case sensitive 

Windows paths use a backslash (\)  

UNIX paths use a forward slash (/) 

UNIX contains option switches (-) 

Ls – Means list. Can be used with –l to provide a long listing. 

Man – Command used to lookup the manual pages for a certain command.  

Unix Users 

 Root User – Only user account installed on the system during installation – ID 0 

System Users – ID 1-999 

Local Users – 1000+ 

Useradd – Creates new user information 

Userdel – Deletes a user account 

passwd – Enables a user to change their password 

Id – Print user and group info for the specified USER, or current user 

Profiles – Allow you to save your default settings when you log into a computer 

- Profiles are stored in /etc/profile 
    

/etc/ 

/etc/passwd - Contains a line for each user and system account 

- Permissions for the /etc/passwd file are read for everyone!!! 
    
- Includes 7 different fields - (User Shell, User Directory, User Info, Group ID, User ID, Has Login Password, User Name) 
    

/etc/shadow - Contains password and account expiration information for ALL user accounts  

- Only root can read and write to the contents of the shadow file  
    
- Includes 8 different fields - (Username, Password, Last Password Change, Minimum Days, Maximum Days, Warn, Inactive, Expire) 
    

Working Directory 

Absolute Path – The DIRECT pathname to a file from the root folder (/) all the way down to the file 

Relative Path – Is a path that is based on the current working directory. (EX: Your current working directory is root, but you want to access bin. You only have to cd into the bin folder) 

Path Variable 

Path Variable – list of common absolute paths used by the OS when searching for commands or files 

User Permissions 

Owner – The Owner permissions apply only the owner of the file or directory 

Group – This applies only to the group that has been assigned to the file or directory 

Other – The Users permissions apply to all other users on the system 

Read – The Read permission refers to a user being able to read the contents of the file – Value of 4 

Write – The Write permissions refer to a user having permission to write or modify a file or directory – Value of 2 

Execute – The Execute permission, if set, allows a user to execute a file or view the contents of a directory – Value of 1 

Ls –l – shows file type, permissions related to user, group, and other, the # of hard links, owners (user and group), file size, Last Modify Time, and the File Name 

Android Characteristics 

Android Sandbox – Isolates apps from each other and protects apps/the system from malicious apps 

Android Runtime (ART) - Is the managed runtime used by applications and some system services on Android. Primary purpose is to implement portions of an execution model. 

Java – Official language for Android Development 

IOS Characteristics 

XNU Kernal – Heart of iOS 

IOS Secure Boot Chain – Uses secure boot chain mechanism to provide security in the booting process – Ensures low-level software is not compromised and iOS is running on validated iDevice 

Secure Enclave – Dedicated secure subsystem integrated into Apple Systems on chip (SoCs).