import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { 
  LogOut, 
  Eye, 
  RefreshCw, 
  CheckCircle, 
  XCircle, 
  Trash2, 
  AlertCircle,
  Mail
} from "lucide-react";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Database } from "@/integrations/supabase/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ContactStatus = Database["public"]["Enums"]["contact_status"];
type SubscriptionStatus = Database["public"]["Enums"]["subscription_status"];

type Contact = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  status: ContactStatus;
  read: boolean;
};

type NewsletterSubscription = {
  id: string;
  email: string;
  created_at: string;
  status: SubscriptionStatus;
};

const AdminDashboard = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [subscriptions, setSubscriptions] = useState<NewsletterSubscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [subscriptionsLoading, setSubscriptionsLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [selectedSubscription, setSelectedSubscription] = useState<NewsletterSubscription | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleteSubscriptionDialogOpen, setIsDeleteSubscriptionDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/admin/login");
      return;
    }

    fetchContacts();
    fetchSubscriptions();
  }, [user, navigate]);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      console.log("Fetching contacts...");
      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching contacts:", error);
        throw error;
      }

      console.log("Contacts fetched:", data);
      setContacts(data || []);
    } catch (error: any) {
      console.error("Error in fetchContacts:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to fetch contacts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchSubscriptions = async () => {
    setSubscriptionsLoading(true);
    try {
      console.log("Fetching newsletter subscriptions...");
      const { data, error } = await supabase
        .from("newsletter_subscriptions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching subscriptions:", error);
        throw error;
      }

      console.log("Subscriptions fetched:", data);
      setSubscriptions(data || []);
    } catch (error: any) {
      console.error("Error in fetchSubscriptions:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to fetch newsletter subscriptions",
        variant: "destructive",
      });
    } finally {
      setSubscriptionsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Success",
        description: "Logged out successfully",
      });
      navigate("/admin/login");
    } catch (error: any) {
      console.error("Logout error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to log out",
        variant: "destructive",
      });
    }
  };

  const viewContact = async (contact: Contact) => {
    console.log("Viewing contact:", contact);
    setSelectedContact(contact);
    setIsDialogOpen(true);

    // Mark as read if not already
    if (!contact.read) {
      try {
        const { error } = await supabase
          .from("contacts")
          .update({ read: true })
          .eq("id", contact.id);

        if (error) {
          console.error("Error marking as read:", error);
          throw error;
        }

        // Update local state
        setContacts(
          contacts.map((c) => 
            c.id === contact.id ? { ...c, read: true } : c
          )
        );
      } catch (error: any) {
        console.error("Error in viewContact:", error);
        toast({
          title: "Error",
          description: error.message || "Failed to mark as read",
          variant: "destructive",
        });
      }
    }
  };

  const updateContactStatus = async (contactId: string, status: ContactStatus) => {
    try {
      console.log(`Updating contact ${contactId} status to ${status}`);
      const { error } = await supabase
        .from("contacts")
        .update({ status })
        .eq("id", contactId);

      if (error) {
        console.error("Error updating status:", error);
        throw error;
      }

      // Update local state
      setContacts(
        contacts.map((c) => 
          c.id === contactId ? { ...c, status } : c
        )
      );
      
      toast({
        title: "Success",
        description: `Contact marked as ${status}`,
      });
      
      // Close dialog if open
      if (isDialogOpen && selectedContact?.id === contactId) {
        setSelectedContact((prev) => prev ? {...prev, status} : null);
      }
    } catch (error: any) {
      console.error("Error in updateContactStatus:", error);
      toast({
        title: "Error",
        description: error.message || `Failed to update status to ${status}`,
        variant: "destructive",
      });
    }
  };

  const updateSubscriptionStatus = async (subscriptionId: string, status: SubscriptionStatus) => {
    try {
      console.log(`Updating subscription ${subscriptionId} status to ${status}`);
      const { error } = await supabase
        .from("newsletter_subscriptions")
        .update({ status })
        .eq("id", subscriptionId);

      if (error) {
        console.error("Error updating subscription status:", error);
        throw error;
      }

      // Update local state
      setSubscriptions(
        subscriptions.map((s) => 
          s.id === subscriptionId ? { ...s, status } : s
        )
      );
      
      toast({
        title: "Success",
        description: `Subscription marked as ${status}`,
      });
    } catch (error: any) {
      console.error("Error in updateSubscriptionStatus:", error);
      toast({
        title: "Error",
        description: error.message || `Failed to update subscription status to ${status}`,
        variant: "destructive",
      });
    }
  };

  const handleDeleteContact = (contact: Contact) => {
    console.log("Preparing to delete contact:", contact);
    setSelectedContact(contact);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteSubscription = (subscription: NewsletterSubscription) => {
    console.log("Preparing to delete subscription:", subscription);
    setSelectedSubscription(subscription);
    setIsDeleteSubscriptionDialogOpen(true);
  };

  const confirmDeleteContact = async () => {
    if (!selectedContact) return;
    
    try {
      setIsDeleting(true);
      console.log("Deleting contact:", selectedContact.id);
      const { error } = await supabase
        .from("contacts")
        .delete()
        .eq("id", selectedContact.id);

      if (error) {
        console.error("Error deleting contact:", error);
        throw error;
      }

      // Update local state safely - prevent state update issues after deletion
      const contactId = selectedContact.id;
      setContacts((prevContacts) => prevContacts.filter((c) => c.id !== contactId));
      
      toast({
        title: "Success",
        description: "Contact deleted successfully",
      });
      
      // Close dialogs
      setIsDeleteDialogOpen(false);
      setIsDialogOpen(false);
      // Clear selected contact after closing dialogs
      setSelectedContact(null);
    } catch (error: any) {
      console.error("Error in confirmDeleteContact:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete contact",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const confirmDeleteSubscription = async () => {
    if (!selectedSubscription) return;
    
    try {
      setIsDeleting(true);
      console.log("Deleting subscription:", selectedSubscription.id);
      const { error } = await supabase
        .from("newsletter_subscriptions")
        .delete()
        .eq("id", selectedSubscription.id);

      if (error) {
        console.error("Error deleting subscription:", error);
        throw error;
      }

      // Update local state
      const subscriptionId = selectedSubscription.id;
      setSubscriptions((prevSubscriptions) => 
        prevSubscriptions.filter((s) => s.id !== subscriptionId)
      );
      
      toast({
        title: "Success",
        description: "Newsletter subscription deleted successfully",
      });
      
      // Close dialog
      setIsDeleteSubscriptionDialogOpen(false);
      // Clear selected subscription
      setSelectedSubscription(null);
    } catch (error: any) {
      console.error("Error in confirmDeleteSubscription:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete subscription",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case 'responded':
        return "bg-green-500/20 text-green-500";
      case 'rejected':
        return "bg-red-500/20 text-red-500";
      case 'active':
        return "bg-green-500/20 text-green-500";
      case 'unsubscribed':
        return "bg-gray-500/20 text-gray-500";
      default:
        return "bg-yellow-500/20 text-yellow-500";
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'responded':
        return "Accepted";
      case 'rejected':
        return "Rejected";
      case 'active':
        return "Active";
      case 'unsubscribed':
        return "Unsubscribed";
      default:
        return "Pending";
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-mediarch-dark">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-mediarch">Admin Dashboard</h1>
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    fetchContacts();
                    fetchSubscriptions();
                  }}
                  className="flex items-center gap-2 border-mediarch/30 text-mediarch"
                >
                  <RefreshCw size={16} />
                  Refresh
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  className="flex items-center gap-2 border-white/30 text-white"
                >
                  <LogOut size={16} />
                  Logout
                </Button>
              </div>
            </div>

            <Tabs defaultValue="contacts" className="w-full">
              <TabsList className="mb-6 bg-white/5 border border-white/10">
                <TabsTrigger value="contacts" className="data-[state=active]:bg-mediarch data-[state=active]:text-white">
                  Contact Enquiries
                </TabsTrigger>
                <TabsTrigger value="newsletter" className="data-[state=active]:bg-mediarch data-[state=active]:text-white">
                  Newsletter Subscribers
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="contacts">
                <Card className="backdrop-blur-md bg-white/5 border border-white/10">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">Contact Enquiries</CardTitle>
                    <CardDescription className="text-gray-300">
                      Manage and respond to user contact submissions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mediarch mx-auto mb-4"></div>
                        <p className="text-gray-300">Loading contacts...</p>
                      </div>
                    ) : contacts.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-300">No contact enquiries found</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableCaption>A list of all contact enquiries</TableCaption>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Status</TableHead>
                              <TableHead>Name</TableHead>
                              <TableHead>Email</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {contacts.map((contact) => (
                              <TableRow 
                                key={contact.id}
                                className={!contact.read ? "bg-mediarch/10" : ""}
                              >
                                <TableCell>
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    getStatusBadgeClass(contact.status || 'pending')
                                  }`}>
                                    {getStatusLabel(contact.status || 'pending')}
                                  </span>
                                </TableCell>
                                <TableCell className="font-medium">{contact.name}</TableCell>
                                <TableCell>{contact.email}</TableCell>
                                <TableCell>{formatDate(contact.created_at)}</TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      className="text-mediarch hover:text-mediarch/80"
                                      onClick={() => viewContact(contact)}
                                    >
                                      <Eye size={16} />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      className="text-green-500 hover:text-green-600"
                                      onClick={() => updateContactStatus(contact.id, 'responded')}
                                      title="Accept"
                                    >
                                      <CheckCircle size={16} />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      className="text-red-500 hover:text-red-600"
                                      onClick={() => updateContactStatus(contact.id, 'rejected')}
                                      title="Reject"
                                    >
                                      <XCircle size={16} />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      className="text-gray-500 hover:text-gray-600"
                                      onClick={() => handleDeleteContact(contact)}
                                      title="Delete"
                                    >
                                      <Trash2 size={16} />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="newsletter">
                <Card className="backdrop-blur-md bg-white/5 border border-white/10">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">Newsletter Subscribers</CardTitle>
                    <CardDescription className="text-gray-300">
                      Manage users who have subscribed to your newsletter
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {subscriptionsLoading ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mediarch mx-auto mb-4"></div>
                        <p className="text-gray-300">Loading subscribers...</p>
                      </div>
                    ) : subscriptions.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-300">No newsletter subscribers found</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableCaption>A list of all newsletter subscribers</TableCaption>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Status</TableHead>
                              <TableHead>Email</TableHead>
                              <TableHead>Subscribed On</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {subscriptions.map((subscription) => (
                              <TableRow key={subscription.id}>
                                <TableCell>
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    getStatusBadgeClass(subscription.status || 'active')
                                  }`}>
                                    {getStatusLabel(subscription.status || 'active')}
                                  </span>
                                </TableCell>
                                <TableCell className="font-medium">{subscription.email}</TableCell>
                                <TableCell>{formatDate(subscription.created_at)}</TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      className="text-mediarch hover:text-mediarch/80"
                                      onClick={() => window.open(`mailto:${subscription.email}`)}
                                      title="Send Email"
                                    >
                                      <Mail size={16} />
                                    </Button>
                                    {subscription.status === 'active' ? (
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        className="text-gray-500 hover:text-gray-600"
                                        onClick={() => updateSubscriptionStatus(subscription.id, 'unsubscribed')}
                                        title="Unsubscribe"
                                      >
                                        <XCircle size={16} />
                                      </Button>
                                    ) : (
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        className="text-green-500 hover:text-green-600"
                                        onClick={() => updateSubscriptionStatus(subscription.id, 'active')}
                                        title="Reactivate"
                                      >
                                        <CheckCircle size={16} />
                                      </Button>
                                    )}
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      className="text-red-500 hover:text-red-600"
                                      onClick={() => handleDeleteSubscription(subscription)}
                                      title="Delete"
                                    >
                                      <Trash2 size={16} />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
      
      <Dialog open={isDialogOpen} onOpenChange={(open) => {
        if (!isDeleting) setIsDialogOpen(open);
      }}>
        <DialogContent className="bg-mediarch-dark border border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl">Contact Details</DialogTitle>
            <DialogDescription className="text-gray-300">
              View and manage contact enquiry
            </DialogDescription>
          </DialogHeader>
          
          {selectedContact && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-400">Name</h4>
                  <p className="mt-1">{selectedContact.name}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400">Email</h4>
                  <p className="mt-1">{selectedContact.email}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400">Date</h4>
                  <p className="mt-1">{formatDate(selectedContact.created_at)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400">Status</h4>
                  <p className="mt-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      getStatusBadgeClass(selectedContact.status || 'pending')
                    }`}>
                      {getStatusLabel(selectedContact.status || 'pending')}
                    </span>
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-400">Message</h4>
                <div className="mt-2 p-4 rounded-md bg-white/5 border border-white/10">
                  <p className="whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
              </div>
              
              <div className="flex justify-between pt-4">
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="border-green-500/30 text-green-500 hover:bg-green-500/10"
                    onClick={() => updateContactStatus(selectedContact.id, 'responded')}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Accept
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-red-500/30 text-red-500 hover:bg-red-500/10"
                    onClick={() => updateContactStatus(selectedContact.id, 'rejected')}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                </div>
                <Button 
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10"
                  onClick={() => handleDeleteContact(selectedContact)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-mediarch-dark border border-white/10 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              This action cannot be undone. This will permanently delete the contact enquiry.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border border-white/30 text-white hover:bg-white/10">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-500 text-white hover:bg-red-600"
              onClick={(e) => {
                e.preventDefault();
                confirmDeleteContact();
              }}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Deleting...
                </div>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isDeleteSubscriptionDialogOpen} onOpenChange={setIsDeleteSubscriptionDialogOpen}>
        <AlertDialogContent className="bg-mediarch-dark border border-white/10 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              This action cannot be undone. This will permanently delete this newsletter subscription.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border border-white/30 text-white hover:bg-white/10">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-500 text-white hover:bg-red-600"
              onClick={(e) => {
                e.preventDefault();
                confirmDeleteSubscription();
              }}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Deleting...
                </div>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
